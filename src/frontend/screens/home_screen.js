import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.spacer} />
        <Text style={styles.welcomeText}>Sales</Text>
        <Text style = {styles.welcomeText}>Enablement</Text>
        <Text style = {{
    fontSize: 20,
    color: 'white',
    paddingLeft: 20,}}>about</Text>
        <Text style = {{
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,}}>Tool and Die Shops</Text>
        </View>
        <Text style={styles.helperText}>This simulator will help you learn about prospects and customers in the tool and die industry. Select one of the simulators below to get started!</Text>
    
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.MachinistButton} onPress={() => navigation.navigate('Handler', {'assistantChoice' : 'Machinist'})}>
            <Text style={styles.buttonText}>Learn About the Industry</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.DiscoveryButton} onPress={() => navigation.navigate('Handler', {'assistantChoice' : 'Discovery'})}>
            <Text style={styles.buttonText}>Practice your Discovery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SalesButton} onPress={() => navigation.navigate(' Handler', {'assistantChoice' : 'Sales_call'})}>
            <Text style={styles.buttonText}>Simulate a Sales Call</Text>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2D373C',
  },
  container: {
    flex: 1,
  },
  spacer: {
    flex: 0.20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 20,
  },
  helperText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
  },
  MachinistButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#009999',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  DiscoveryButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#2387AA',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  SalesButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#005F87',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
  },
});
