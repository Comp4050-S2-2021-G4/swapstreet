// import React from "react";
// import Footer from '../components/Footer'
// import ChatMessage from '../chat/ChatMessage'
// import {useRef, useState} from 'react';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import {useCollectionData} from 'react-firebase-hooks/firestore';

// import {getMessages, getMessagesCollection} from './chat';
// import './chat.css'
// import './chat'

// function ChatRoom() {

//     const dummy = useRef();
//     const [formValue, setFormValue] = useState('');
//     const [messages] = useCollectionData(getMessages(), { idField: 'id'})

//     const auth = firebase.auth()

//     const sendMessage = async (e) => {
//         e.preventDefault()
//         try {
//             const uid = auth.currentUser.uid;
//             console.log('sendMessage:', uid);
//             const sentMessage = await getMessagesCollection().add(
//                 {
//                     text: formValue,
//                     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//                     uid: uid
//                 }
//             )
//             console.log('sendMessage', sentMessage);
//         } catch (e) {
//             console.log('sendMessage', e);
//         }
//         setFormValue('')
//         dummy.current.scrollIntoView({ behavior: 'smooth' })
//     }

//     return (<>
//         <main>
//             {messages && messages.map(msg => {
//                 msg.messageType = msg.uid === auth.currentUser.uid ? 'sent' : 'received'
//                 return <ChatMessage key={msg.id} message={msg} />
//             })}

//             <span ref={dummy}/>
//         </main>

//         <form className='messageForm' onSubmit={sendMessage}>

//             <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

//             <button type="submit" disabled={!formValue}>🕊️</button>

//         </form>
//     </>)
// }


// export default ChatRoom;
