import React from 'react';
import './chat.css'


export default function ChatMessage(props) {
    const { text, messageType, photoURL } = props.message;
    const src = photoURL || 'https://uatcdn0.woolworths.media/content/suggestedlists/getting-started.jpg';
    console.log(props.message);
    return (<>
        <div className={`message ${messageType}`}>
            <img src={ src }  alt='profilePic'/>
            <p className="messageText">{text}</p>
        </div>
    </>)
}
