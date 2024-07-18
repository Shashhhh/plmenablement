import "./chat.css";
import TextInput from '../components/text_input';
import { useState, useEffect } from "react";

const Chat = ({ messages, handleSend, loading }) => {
    const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
    const [showOverlay, setShowOverlay] = useState(true);
    useEffect(() => {
        const handleResize = () => {
        setIsMobileScreen(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleOverlay = () => {
        setShowOverlay(false);
    };
    return (
        
        <div className="chat">
        <div className="headerBand">
        Learn about the Tool and Die industry
        </div>
        {showOverlay && isMobileScreen && <div className="overlay"/>}
        {isMobileScreen ?
        (<dialog className="welcomeDialog" open>
            <span style={{ fontWeight: 'bold' }}>
                Hi,
            </span>
            <p>
                I'm Hank Spanner. I'm the owner of a machine shop with extensive experience in the Mold and Die industry. 30 years ago, I started as a machinist, and grew into owning my own shop in 2014. With my wide-ranging background, I think I can provide a pretty good perspective of the industry, both from the shop floor to the front office. 
            </p>
            <span style={{ fontWeight: 'bold' }}>
                What's your name?
            </span>
            <form method="dialog">
            <div className="dialogButtonContainer">
                <button className= "dialogButton" onClick={handleOverlay}>Close</button>
            </div>
                
            </form>
            </dialog>)
        :
        (<div className="context">
            <img src="./MachinistImage.png" alt="Machinist" />
            <div className="contextText">
                <span style={{ fontWeight: 'bold' }}>
                    Hi,
                </span>
                <p>
                    I'm Hank Spanner. I'm the owner of a machine shop with extensive experience in the Mold and Die industry. 30 years ago, I started as a machinist, and grew into owning my own shop in 2014. With my wide-ranging background, I think I can provide a pretty good perspective of the industry, both from the shop floor to the front office. 
                </p>
                <span style={{ fontWeight: 'bold' }}>
                    What's your name?
                </span>
                </div>
            </div>
)
        }
            
        <div className="chatScreen">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`messageContainer ${message.isUserMessage ? 'userMessage' : 'responseMessage'}`}
                >
                <p className="messageText">{message.content}</p>
                </div>
                ))}
            {loading && <div class="loading"></div>}
            </div> 
            <div className="inputContainer">
                <TextInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default Chat;
