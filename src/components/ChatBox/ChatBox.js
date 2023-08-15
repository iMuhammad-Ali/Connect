import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Messages from "./Messages/Messages";
import ChatInput from "./ChatInput/ChatInput";
import Users from "./ActiveUsers/Users";
import MobileUsers from "./ActiveUsers/MobileUsers";

const ChatBox = (props) => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const autoTrigger = () => {
            navigate('/signin')
            toast.error('An error occurred. You\'re logged out! Please Login again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
            });
        }
        if (!props.user) {
            autoTrigger();
        }
    }, []); // eslint-disable-line
    // Text Message Input
    const inputChangeHandler = (inputValue) => {
        setMessage(inputValue);
    }
    // File Input
    const setFileHandler = (file) => {
        setFile(file);
    }
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFile(file)
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    // Send Message
    const sendMessageHandler = async () => {
        if (message.trim() === '') return;
        try {
            const allMessagesCollectionRef = collection(db, 'allMessages');
            await addDoc(allMessagesCollectionRef, {
                type: "text",
                senderId: props.user.uid,
                senderName: props.user.displayName,
                content: message,
                timestamp: serverTimestamp(),
                reaction: []
            });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    }
    // Send Voice
    const sendVoiceHandler = async (audioChunksRef) => {
        if (audioChunksRef.current.length === 0) {
            return;
        }
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFileName = `voice_message_${Date.now()}.webm`;
        const fileRef = ref(storage, `voiceMessages/${audioFileName}`);
        await uploadBytes(fileRef, audioBlob);
        const downloadURL = await getDownloadURL(fileRef);
        audioChunksRef.current = [];
        try {
            const allMessagesCollectionRef = collection(db, 'allMessages');
            await addDoc(allMessagesCollectionRef, {
                type: 'voice',
                senderId: props.user.uid,
                senderName: props.user.displayName,
                downloadURL: downloadURL,
                timestamp: serverTimestamp(),
                reaction: [],
            });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    }
    // Send Media File
    const sendMediaHandler = async () => {
        if (file) {
            const fileRef = ref(storage, `media/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);
            const allMessagesCollectionRef = collection(db, 'allMessages');
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.error("File Uploaded: ", snapshot);
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.error("Error uploading the file:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    try {
                        await addDoc(allMessagesCollectionRef, {
                            type: 'media',
                            senderId: props.user.uid,
                            senderName: props.user.displayName,
                            fileName: file.name,
                            downloadURL: downloadURL,
                            timestamp: serverTimestamp(),
                            reaction: []
                        });
                    } catch (error) {
                        console.error('Error sending message:', error.message);
                    }
                }
            )
        }
    }
    // Message Reaction
    const findMessageHandler = async (message, reaction, user) => {
        try {
            const allMessagesCollectionRef = collection(db, 'allMessages');
            let messageQuery = '';
            if (message.type === 'media') {
                messageQuery = query(allMessagesCollectionRef, where('downloadURL', '==', message.downloadURL));
            } else if (message.type === 'voice') {
                messageQuery = query(allMessagesCollectionRef, where('downloadURL', '==', message.downloadURL));
            } else {
                messageQuery = query(allMessagesCollectionRef, where('content', '==', message.content));
            }
            const snapshot = await getDocs(messageQuery);
            const currentReactions = snapshot.docs[0].data().reaction;
            if (!snapshot.empty) {
                const existingReactionIndex = currentReactions.findIndex(reaction => reaction.userId === user.uid);
                if (existingReactionIndex !== -1) {
                    if (currentReactions[existingReactionIndex].reaction === reaction && currentReactions[existingReactionIndex].userId === user.uid) {
                        currentReactions.splice(existingReactionIndex, 1);
                    } else {
                        currentReactions[existingReactionIndex].reaction = reaction;
                    }
                } else {
                    const reactionObject = {
                        userId: user.uid,
                        userName: user.displayName,
                        reaction: reaction,
                    };
                    currentReactions.push(reactionObject);
                }
                const docRef = doc(db, 'allMessages', snapshot.docs[0].id);
                await updateDoc(docRef, { reaction: currentReactions });
            }
        }
        catch (error) {
            console.error('Error getting message:', error.message);
        }
    }

    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver} class="max-h-screen h-screen w-full">
            <div class="grid lg:grid-cols-3 h-screen max-h-screen">
                <div class="flex flex-col col-span-2 lg:block relative">
                    <div class="flex-grow h-screen max-h-screen overflow-y-scroll custom-scrollbar">
                        <MobileUsers
                            user={props.user}
                        />
                        <Messages
                            user={props.user}
                            message={message}
                            sendMedia={sendMediaHandler}
                            findMessageHandler={findMessageHandler}
                        />
                    </div>
                    <div class="absolute bottom-0 w-full bg-white">
                        <ChatInput
                            file={file}
                            setFile={setFileHandler}
                            onInputChange={inputChangeHandler}
                            sendMessage={sendMessageHandler}
                            sendVoice={sendVoiceHandler}
                            sendMedia={sendMediaHandler}
                        />
                    </div>
                </div>
                <div style={{ backgroundColor: "#5011CC" }} class="hidden lg:block h-screen max-h-screen">
                    <Users user={props.user} />
                </div>
            </div>
        </div>
    );
}

export default ChatBox
