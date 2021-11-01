import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCrUzYngucE_U5nqCggULTAlhJS2f6tVks",
    authDomain:
        "chat-app-demo-0-4050.firebaseapp.com",
    databaseURL: "https://chat-app-demo-0-4050-default-rtdb.firebaseio.com",
    projectId: "chat-app-demo-0-4050",
    storageBucket: "chat-app-demo-0-4050.appspot.com",
    messagingSenderId: "357664149852",
    appId: "1:357664149852:web:c17b5f10bbba9af1477199"
};

const app = firebase.initializeApp(firebaseConfig);
console.log(`chat#:17`,app);

const firestore = firebase.firestore();

export const getMessages = () => {
    return getMessagesCollection()
        .orderBy('createdAt')
}

export const getMessagesCollection = () => firestore.collection('conversations')

export async function doesChatConversationExist(userId, jobPosterId) {
    console.log(`chat#doesChatConversationExist:30`,userId, jobPosterId);
    let query = getMessagesCollection();
    query = query.where('userId', '==', userId)
    query = query.where('otherId', '==', jobPosterId)
    query = query.limit(1)
    const res = await query.get()
    const data = res.docs.map(d => {
        console.log(`chat#:35`, d.id);
        return { id: d.id, ...d.data() }
    });
    return data
}

export async function createChatConversation(userId, jobPosterId) {
    console.log(`chat#createChatConversation:38`, userId, jobPosterId);
    const conversation = await getMessagesCollection().add({
        userId,
        otherId: jobPosterId,
    })
    const messagesRes = await getMessagesCollection()
        .doc(conversation.id)

        .collection('messages')
    return { conversationId: conversation.id, messageId: messagesRes.id }
}

export default {
    firebaseConfig,
    getMessages,
    getMessagesCollection,
    doesChatConversationExist,
    createChatConversation,
};
