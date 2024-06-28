import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home_screen'
import Handler from './components/chat_handler';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#2D373C',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Handler" component = {Handler} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

