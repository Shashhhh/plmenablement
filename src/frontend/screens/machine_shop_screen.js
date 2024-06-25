import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './components/chat_screen';


const [messages, setMessages] = useState([]);
  
const handleSend = (text) => {
  const url = 'http://127.0.0.1:8000/api/create_thread_and_run';

  const data = {
    userInput: text,
  };
  setMessages((prevMessages) => [
    ...prevMessages,
    { content: text, isUserMessage: true }
  ]);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(responseData => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: responseData.content_value, isUserMessage: false }
      ]);
    })
    .catch(error => {
      Alert.alert('Error', 'Failed to send data to OpenAI');
      console.error('Error:', error);
    });
    
  
};
  return (
    <View style={styles.container}>
    <ChatScreen
      messages={messages}
      handleSend={handleSend}
    />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
