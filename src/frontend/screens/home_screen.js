import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen({ navigation }) {
  return (

    <SafeAreaView style={styles.safeArea}>

    <View style={styles.container}>
    <View style = {styles.headerStyle}>
      <Text style={styles.welcomeText}>Welcome to Siemens GPT Trainer!</Text>
      <Text style={styles.helperText}>This is an unofficial Siemens app that is here to help answer any questions you have about blah blah blah, click any of the buttons below to continue!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.MachinistButton} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button2} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button3} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end'
  },
  MachinistButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#005F87',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, 
  },
  Button2: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#003750',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, 
  },
  Button3: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#2D373C',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, 
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff', 
  },
  headerStyle:
  {
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: '#009999',
    borderRadius: 20,
    marginBottom: 20,
  },
});
