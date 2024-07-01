import React, { useRef, useEffect } from 'react';
import TextInput from '../components/text_input';
import './chat_screen.css';

const ChatScreen = ({ messages, handleSend }) => {

  return (
    <div className="safeArea">
      <div className="list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`messageContainer ${message.isUserMessage ? 'userMessage' : 'responseMessage'}`}
          >
            <p className="messageText">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <TextInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatScreen;
