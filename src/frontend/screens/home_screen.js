import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const { width: windowWidth } = useWindowDimensions();
  const buttons = [
    { title: 'Machinist GPT', style: styles.MachinistButton, color: '#005F87' },
    { title: 'Button 2', style: styles.Button2, color: '#003750' },
    { title: 'Button 3', style: styles.Button3, color: '#2D373C' },
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % buttons.length;
      scrollViewRef.current.scrollTo({ x: currentIndex * windowWidth, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [buttons.length, windowWidth]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.welcomeText}>Welcome to Siemens GPT Trainer!</Text>
          <Text style={styles.helperText}>
            This is an unofficial Siemens app that is here to help answer any questions you have about blah blah blah, click any of the buttons below to continue!
          </Text>
        </View>
        <View style={styles.scrollViewWrapper}>
          <ScrollView
            horizontal
            style={styles.scrollViewStyle}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            {buttons.map((button, buttonIndex) => (
              <Animated.View style={{ width: windowWidth }} key={buttonIndex}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: button.color }]}
                  onPress={() => navigation.navigate(button.title)}
                >
                  <Text style={styles.buttonText}>{button.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.indicatorContainer}>
          {buttons.map((button, buttonIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (buttonIndex - 1),
                windowWidth * buttonIndex,
                windowWidth * (buttonIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={buttonIndex}
                style={[styles.normalDots, { width, backgroundColor: button.color }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  helperText: {
    paddingVertical: 5,
    color: 'white',
    marginBottom: 10,
  },
  scrollViewWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollViewStyle: {
    flexGrow: 0,
    paddingBottom: 10,
  },
  button: {
    marginVertical: 10,
    width: 250,
    height: 250,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 360,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  headerStyle: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: '#009999',
    borderRadius: 20,
    marginBottom: 20,
  },
});
