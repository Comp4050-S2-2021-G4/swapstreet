import React, {useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/auth";
import "@firebase/app";

import {useCollectionData} from 'react-firebase-hooks/firestore';

let fetched = false
function Conversation(props) {

    const firebaseUserId = props.firebaseUser.user.uid;

    const collectionReference = firebase.firestore().collection("conversations")
        .where('user.userId', '==', firebaseUserId)

    const otherCollectionReference = firebase.firestore().collection("conversations")
        .where('other.jobPosterId', '==', firebaseUserId)

    const [conversations, loading] = useCollectionData(
        collectionReference,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
            idField: 'id',
        }
    )
    const [otherConversations, otherConvoLoading] = useCollectionData(
        otherCollectionReference,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
            idField: 'id',
        }
    )
    const [conversationLastMessage, setConversationList] = useState([])

    if (!loading) {
        console.log('conversations:', conversations);
    }

    const getConversationLastMessage = async (convos) => {
        console.log(`Conversation#setConversationLastMessage:36`, JSON.stringify(convos, null, 2));
        const messages = await firebase.firestore()
            .collection(`conversations`)
            .doc(convos.id)
            .collection(`messages`)
            .orderBy('createdAt')
            .limitToLast(1)
            .get()

        return messages.docs.map((m) => {
            console.log('mData:', m.data());
            console.log('mData:', m.id);
            let isLoggedInUser = firebaseUserId === convos.user.userId;
            const name = isLoggedInUser ? convos.other.posterName : convos.user.name
            const text = isLoggedInUser ? 'You: ' + m.data().text : m.data().text
            return { ...m.data(), id: m.id , conversationId: convos.id, name, text}
        })
    }
    useEffect(async () => {
        if (!loading && !fetched && !otherConvoLoading) {
            const data = []
            conversations.push(...otherConversations)
            for (const c of conversations) {
                console.log(`Conversation#:50`, JSON.stringify(c, null, 2));
                console.log(`Conversation#:51`, c.user.userId);
                const conversationLastMessage = await getConversationLastMessage({
                    id: c.id,
                    ...c
                })
                data.push(...conversationLastMessage)
            }
            console.log(`Conversation#:71`, JSON.stringify(data, null, 2));
            fetched = true
            setConversationList(data)
        }
    })

    function navigateToChatRoom(event, id) {
        event.preventDefault()
        console.log(`Conversation#navigateToChatRoom:66`, id);
        window.location.href = "messages/" + id
    }

    return (<>
        <div className='conversation w-auto col-md-11'>
            <h2>Messages</h2>
            <ul>

                {conversationLastMessage.length <= 0 ? <li> <p>loading</p> </li> : conversationLastMessage.map(c => (
                    <div className='card bg-light'>

                        <div className='card-body2 border-danger'>
                            <li className={'chatConversationItem'} key={c.id} onClick={e => navigateToChatRoom(e, c.conversationId)}>
                                <img src={ c.photoURL || "https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin"
                                     className="rounded-circle" width="150"/>
                                <p className='card-title'>{c.name}</p>
                                <p className='card-text'>{c.text}</p>
                            </li>
                        </div>
                    </div>
                ))}
                <li><br/></li>
            </ul>
        </div>
    </>)
}

export default Conversation
