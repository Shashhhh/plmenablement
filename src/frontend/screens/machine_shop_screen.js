  import React, { useState, useEffect } from 'react';
  import { View, StyleSheet, Alert } from 'react-native';
  import ChatScreen from '../components/chat_screen';
  
  export default function MachinistGPT({ navigation }) {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
  
    useEffect(() => {
      const ws = new WebSocket('ws://127.0.0.1:8000/ws/stream/');
  
      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      ws.onmessage = (event) => {
        const responseData = JSON.parse(event.data);
        if (responseData.content_value) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: responseData.content_value, isUserMessage: false }
          ]);
        } else if (responseData.delta) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: responseData.delta, isUserMessage: false }
          ]);
        } else if (responseData.error) {
          Alert.alert('Error', responseData.error);
        }
      };
  
      ws.onerror = (error) => {
        Alert.alert('Error', 'WebSocket error occurred');
        console.error('WebSocket error:', error);
      };
  
      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      setSocket(ws);
  
      return () => {
        ws.close();
      };
    }, []);
  
    const handleSend = (text) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: text, isUserMessage: true }
      ]);
  
      if (socket) {
        socket.send(text);
      } else {
        Alert.alert('Error', 'WebSocket connection is not open');
      }
    };
  
    return (
      <View style={styles.container}>
        <ChatScreen
          messages={messages}
          handleSend={handleSend}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  