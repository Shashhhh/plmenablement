import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ChatScreen from '../components/chat_screen';

export default function Handler({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const {assistantChoice} = route.params;
  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/stream/${assistantChoice}/`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const responseData = JSON.parse(event.data);
      if (responseData.delta) {
        updateCurrentMessage(responseData.delta);
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

  const updateCurrentMessage = (deltaText) => {
    setCurrentMessage(prev => prev + deltaText);
  };

  const handleSend = (text) => {
    const newUserMessage = { content: text, isUserMessage: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    if (socket) {
      socket.send(text);
    } else {
      Alert.alert('Error', 'WebSocket connection is not open');
    }
  };

  useEffect(() => {
    if (currentMessage.trim() !== '') {
      const lastMessageIndex = messages.length - 1;
      if (lastMessageIndex >= 0 && !messages[lastMessageIndex].isUserMessage) {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, -1),
          {
            ...prevMessages[lastMessageIndex],
            content: prevMessages[lastMessageIndex].content + currentMessage
          }
        ]);
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { content: currentMessage.trim(), isUserMessage: false }
        ]);
      }
      setCurrentMessage('');
    }
  }, [currentMessage, messages]);

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
