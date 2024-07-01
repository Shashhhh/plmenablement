import React from 'react';
import './text_input.css';
import { FaArrowUp } from "react-icons/fa";

const TextInput = ({ onSend }) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
      <div className="inputContainer">
        <input
          className="textInput"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder="Type a message..."
        />
        <button className="sendButton" onClick={handleSend}>
          <FaArrowUp size={24} color="white" />
        </button>
      </div>
  );
};

export default TextInput;
