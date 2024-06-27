import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Siemens GPT Trainer!</Text>
      <Text style={styles.helperText}>This is an unofficial Siemens app that is here to help answer any questions you have about blah blah blah, click any of the buttons below to continue!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAlign} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAlign} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonAlign} onPress={() => navigation.navigate('Machinist GPT')}>
          <Text style={styles.buttonText}>Machinist GPT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  helperText: {
    paddingVertical: 5,
    color: 'grey',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  buttonAlign: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#009999',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, 
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff', 
  },
});