import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home_screen'
import MachinistGPT from './screens/machine_shop_screen';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Machinist GPT" component = {MachinistGPT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

