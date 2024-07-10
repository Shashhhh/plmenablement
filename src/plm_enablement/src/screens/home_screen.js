import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className='App'>
      <div className="container">

        <div className="textContainer">
          <div className="welcomeText">Sales</div>
          <div className="welcomeText">Enablement</div>
          <div className="aboutText">about</div>
          <div className="titleText">Tool and Die Shops</div>
        <div className="helperText">
          This simulator will help you learn about prospects and customers in the tool and die industry. Select one of the simulators below to get started!
        </div>
        </div>
      <div className="bodyContainer">
      <div>
      <button className="MachinistButton" onClick={() => navigate('/chat?assistantChoice=Machinist')}>
          Learn About the Industry
        </button>
        <button className="DiscoveryButton" onClick={() => navigate('/chat?assistantChoice=Discovery')}>
          Practice your Discovery
        </button>
        <button className="SalesButton" onClick={() => navigate('/chat?assistantChoice=Sales_call')}>
          Simulate a Sales Call
        </button>
      </div>

      </div>
    </div>
    </div>
  );
}
