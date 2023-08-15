import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import VoiceMessage from "./VoiceMessage";
import TextMessage from "./TextMessage";
import MediaMessage from "./MediaMessage";
import './scrollbar.css';

const Messages = (props) => {
    const [allMessages, setAllMessages] = useState([]);
    const allMessagesCollectionRef = collection(db, 'allMessages');
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

        }
    }, [allMessages]);

    useEffect(() => {
        const unsubscribe = onSnapshot(allMessagesCollectionRef, handleRealTimeAllUpdates);
        return () => unsubscribe();
    }, [props.user]);

    const sortMessagesByTimestamp = (messages) => {
        return messages.slice().sort((a, b) => a.timestamp - b.timestamp);
    };

    const handleRealTimeAllUpdates = (snapshot) => {
        const allData = snapshot.docs.map((doc) => doc.data());
        const allMessages = sortMessagesByTimestamp(allData);
        setAllMessages(allMessages);
    };

    const formatTimestamp = (timestamp) => {
        if (timestamp) {
            const jsDate = timestamp.toDate();
            let hours = jsDate.getHours();
            let minutes = jsDate.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours %= 12;
            hours = hours || 12; // Convert 0 to 12
            return (`${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`);
        }
    };

    return (
        <div ref={messagesContainerRef} class='px-3 pb-20 lg:pt-2 lg:relative w-full'>
            <ul class='space-y-4'>
                {allMessages.map((message, index) => (
                    <div key={index}>
                        {message.type === 'text' ?
                            <TextMessage
                                user={props.user}
                                message={message}
                                index={index}
                                formatTimestamp={formatTimestamp}
                                findMessageHandler={props.findMessageHandler}
                            /> : null}
                        {message.type === 'voice' ?
                            <VoiceMessage
                                user={props.user}
                                voice={message}
                                index={index}
                                formatTimestamp={formatTimestamp}
                                findMessageHandler={props.findMessageHandler}
                            /> : null}
                        {message.type === 'media' ?
                            <MediaMessage
                                user={props.user}
                                media={message}
                                index={index}
                                formatTimestamp={formatTimestamp}
                                findMessageHandler={props.findMessageHandler}
                            /> : null}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Messages