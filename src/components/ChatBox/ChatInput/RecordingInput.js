import "./RecordingInput.css";
import { ReactComponent as Mic } from "feather-icons/dist/icons/mic.svg";
import { ReactComponent as MicDisabled } from "feather-icons/dist/icons/mic-off.svg";

const RecordingInput = (props) => {
    return (
        <button disabled={props.file || props.inputValue} onClick={!props.recording ? props.startRecording : props.stopRecording}>
            {!props.file && !props.inputValue?
                <Mic 
                    class={props.recording ? 'w-7 h-7 microphone-animation' : "w-7 h-7 text-gray-500"}
                />
               : <MicDisabled class="w-7 h-7 text-gray-500" />
            }
        </button>
    );
}

export default RecordingInput