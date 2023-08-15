import { useState, useRef } from "react";
import EmojiInput from "./EmojiInput";
import RecordingInput from "./RecordingInput";
import FileInput from "./FileInput";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";

const ChatInput = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    // Clear All inputs
    const clearInputHandler = () => {
        setInputValue('');
        props.setFile(null);
        setRecording(false);
    }
    // Voice Message Functions 
    const startRecording = async () => {
        audioChunksRef.current = [];
        await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
            mediaRecorderRef.current.addEventListener("stop", handleRecordingStopped);
            mediaRecorderRef.current.start();
            setRecording(true);
        });
    };
    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
    };
    const handleRecordingStopped = () => {
        setRecording(false);
        props.sendVoice(audioChunksRef);
    };
    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
        }
    };
    // Media Input Functions
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        props.setFile(selectedFile);
    };
    const handleInput = (e) => {
        if (!recording && !props.file) {
            const value = e.target.value;
            setInputValue(value);
            props.onInputChange(value);
        }
    };
    // Emoji Input Functions
    const emojiPickerStateHandler = () => {
        setShowEmojiPicker(!showEmojiPicker)
    }
    const addEmojiHandler = (emoji) => {
        if (!recording && !props.file) {
            setInputValue((prevMessage) => prevMessage + emoji.emoji);
            props.onInputChange(inputValue + emoji.emoji);
        }
    };
    // Send Message on 'ENTER' key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitButtonHandler();
        }
    };
    const submitButtonHandler = () => {
        if (inputValue) {
            props.sendMessage();
        } else if (props.file) {
            props.sendMedia();
        } else if (recording) {
            stopRecording();
        } else {
            alert('No Input')
        }
        setInputValue('');
        props.setFile(null);
        setRecording(false);
        setShowEmojiPicker(false);
    }
    // Input Styling on message type
    let placeholderValue = "Message";
    let inputDivClass = "flex bg-gray-100 align-center w-full py-2 px-4 mx-3 bg-gray-100 rounded-lg";
    if (recording) {
        placeholderValue = "Recording...";
        inputDivClass = "input-animation flex bg-gray-100 align-center w-full py-2 px-4 mx-3 bg-gray-100 rounded-lg";
    } else if (props.file) {
        placeholderValue = `File Uploaded! [ ${props.file.name} ]`;
        inputDivClass = "bg-blue-200 flex bg-gray-100 align-center w-full py-2 px-4 mx-3 rounded-lg";
    }

    return (
        <div class="gap-2 fixed bottom-0 lg:relative z-30 bg-white flex items-center justify-between w-full p-3 border-t border-gray-300">
            <EmojiInput
                showEmojiPicker={showEmojiPicker}
                emojiPickerStateHandler={emojiPickerStateHandler}
                addEmojiHandler={addEmojiHandler}
            />
            <FileInput
                file={props.file}
                handleFileChange={handleFileChange}
                recording={recording}
            />
            <div class={inputDivClass} >
                <input
                    required
                    type="text"
                    placeholder={placeholderValue}
                    disabled={recording || props.file}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    class="block w-full pr-3 bg-transparent outline-none focus:text-gray-700"
                />
                {inputValue || recording || props.file ? <CloseIcon class="cursor-pointer" onClick={clearInputHandler} /> : null}
            </div>
            {
                !inputValue && !props.file ?
                    <RecordingInput
                        inputValue={inputValue}
                        file={props.file}
                        recording={recording}
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                    />
                    :
                    <button class="cursor-pointer" onClick={submitButtonHandler} type="submit">
                        <svg
                            style={{ color: "#5011CC" }}
                            class="w-7 h-7 origin-center transform rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
            }
        </div >
    )
}

export default ChatInput