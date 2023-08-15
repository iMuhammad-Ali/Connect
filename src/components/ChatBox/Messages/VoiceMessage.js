import React, { useState, useRef } from "react";
import { ReactComponent as PlayIcon } from "feather-icons/dist/icons/play.svg";
import { ReactComponent as PauseIcon } from "feather-icons/dist/icons/pause.svg";
import { ReactComponent as TickIcon } from "feather-icons/dist/icons/check.svg";
import Loader from "./Loader/Loader";
import Reaction from './Reaction';

const VoiceMessage = (props) => {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef(null);
    const audioHandler = () => {
        if (!audioPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        setAudioPlaying(!audioPlaying);
    };

    const updateTime = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        const progressBar = document.getElementById(`progressBar-/${props.index}`);
        const currentTimeElement = document.getElementById(`currentTime-/${props.index}`);
        // Calculate percentage played
        const percentagePlayed = (currentTime / duration) * 100;
        // Update the progress bar width and current time display
        progressBar.style.width = percentagePlayed + "%";
        if (audioPlaying) {
            currentTimeElement.textContent = formatTime(currentTime);
        } else {
            currentTimeElement.textContent = formatTime(duration);
        }
        if (percentagePlayed === 100 || percentagePlayed === 0) {
            progressBar.style.width = "0%";
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <li key={props.index} class={props.user.uid === props.voice.senderId ? "flex justify-end" : "flex justify-start"}>
            <div class={props.user.uid === props.voice.senderId ? "flex items-center gap-1" : "flex items-center flex-row-reverse gap-1"}>
                <Reaction
                    user={props.user}
                    message={props.voice}
                    findMessageHandler={props.findMessageHandler}
                />
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    {props.user.uid === props.voice.senderId ? null : <span style={{ color: "#5011CC" }} class="text-xs font-bold block text-right">{props.voice.senderName}</span>}
                    <div className="flex gap-2 my-2">
                        <span className="cursor-pointer" onClick={audioHandler}>
                            {!audioPlaying ? <PlayIcon class="m-0" stroke="#5011CC" /> : <PauseIcon stroke="#5011CC" />}
                        </span>
                        <audio
                            ref={audioRef}
                            src={props.voice.downloadURL}
                            onTimeUpdate={updateTime}
                            onEnded={() => setAudioPlaying(false)}
                        />
                        <div className="w-48 bg-red-400 h-1 my-auto">
                            <div id={`progressBar-/${props.index}`} style={{ backgroundColor: "#5011CC" }} className="h-full"></div>
                            <div className="flex justify-between text-sm mt-1">
                                <span id={`currentTime-/${props.index}`}>00:00</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-center gap-2 text-xs text-gray-500 float-right">
                        {props.formatTimestamp(props.voice.timestamp)}
                        {!props.formatTimestamp(props.voice.timestamp) ? <Loader /> : <TickIcon style={{ color: "#5011CC" }} class="w-5 h-5" />}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default VoiceMessage;