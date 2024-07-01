import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatScreen from '../screens/chat_screen';
import './chat_handler.css';


export default function Handler() {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');
  const assistantChoice = new URLSearchParams(location.search).get('assistantChoice');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        alert('Error: ' + responseData.error);
      }
      setLoading(false);
    };

    ws.onerror = (error) => {
      alert('Error: WebSocket error occurred');
      console.error('WebSocket error:', error);
      setLoading(false);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setLoading(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [assistantChoice]);

  const updateCurrentMessage = (deltaText) => {
    setCurrentMessage(prev => prev + deltaText);
  };

  const handleSend = (text) => {
    const newUserMessage = { content: text, isUserMessage: true };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    if (socket) {
      setLoading(true); // Set loading to true when sending a message
      socket.send(text);
    } else {
      alert('Error: WebSocket connection is not open');
    }
  };

  useEffect(() => {
    if (currentMessage.trim() !== '') {
      const lastMessageIndex = messages.length - 1;
      if (lastMessageIndex >= 0 && !messages[lastMessageIndex].isUserMessage) {
        setMessages(prevMessages => [
          ...prevMessages.slice(0, lastMessageIndex),
          { ...prevMessages[lastMessageIndex], content: prevMessages[lastMessageIndex].content + currentMessage }
        ]);
      } else {
        setMessages(prevMessages => [...prevMessages, { content: currentMessage, isUserMessage: false }]);
      }
      setCurrentMessage('');
    }
  }, [currentMessage, messages]);

  return (
    <div className="container">
      <ChatScreen messages={messages} handleSend={handleSend} />
      <div ref={bottomRef}></div>
    </div>
  );
}
