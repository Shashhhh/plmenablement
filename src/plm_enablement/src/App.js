import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/home_screen';
import Handler from './components/chat_handler';
import './home.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/chat" element={<Handler />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
};

export default App;
