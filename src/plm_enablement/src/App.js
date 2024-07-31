import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/home_screen';
import Chat from './components/chat';
import './home.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
};

export default App;
