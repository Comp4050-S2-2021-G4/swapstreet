// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// export const firebaseConfig = {
//     apiKey: "AIzaSyCrUzYngucE_U5nqCggULTAlhJS2f6tVks",
//     authDomain:
//         "chat-app-demo-0-4050.firebaseapp.com",
//     databaseURL: "https://chat-app-demo-0-4050-default-rtdb.firebaseio.com",
//     projectId: "chat-app-demo-0-4050",
//     storageBucket: "chat-app-demo-0-4050.appspot.com",
//     messagingSenderId: "357664149852",
//     appId: "1:357664149852:web:c17b5f10bbba9af1477199"
// };

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();

// export const getMessages = () => {
//     return getMessagesCollection()
//         .orderBy('createdAt')
// }

// export const getMessagesCollection = () => firestore.collection('messages')

// export default { firebaseConfig, getMessages, getMessagesCollection };