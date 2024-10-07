import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';

export default function HomeScreen() {
  const navigate = useNavigate();

  const isUnderConstruction = true;
  return (
    <div className='App'>
      <div className="homeContainer">
        <div className="headerContainer">
          <h1 className="welcomeText">Sales Enablement for Tool and Die Shops</h1>  
        </div>
        <div className="helperContainer">
          <h5 className="helperText">
            This simulator will help you learn about prospects and customers in the tool and die industry. Select one of the simulators below to get started!
          </h5>
        </div>
  
        <div className="bodyContainer">
          <div>
            <button 
              className="MachinistButton" 
              onClick={() => navigate('/chat?assistantChoice=Machinist')}
            >
              Learn About the Industry
            </button>
            <button 
              className="DiscoveryButton" 
              onClick={() => navigate('/chat?assistantChoice=Discovery')}
              disabled={isUnderConstruction} // Disable the button if under construction
            >
              Practice your Discovery
            </button>
            <button 
              className="SalesButton" 
              onClick={() => navigate('/chat?assistantChoice=Sales_call')}
              disabled={isUnderConstruction} 
            >
              Simulate a Sales Call
            </button>

            {isUnderConstruction && (
              <p className="constructionMessage">
                This feature is currently under construction.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
