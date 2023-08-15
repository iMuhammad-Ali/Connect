import { ReactComponent as TickIcon } from "feather-icons/dist/icons/check.svg";
import Loader from "./Loader/Loader";
import Reaction from './Reaction';

const MediaMessage = (props) => {
    return (
        <li key={props.index} class={props.user.uid == props.media.senderId ? "flex rounded justify-end" : "flex rounded justify-start"}>
            <div class={props.user.uid === props.media.senderId ? "flex items-center gap-1" : "flex items-center flex-row-reverse gap-1"}>
                <Reaction
                    user={props.user}
                    message={props.media}
                    findMessageHandler={props.findMessageHandler}
                />
                <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 shadow">
                    <a href={props.media.downloadURL} target="_blank" class="bg-gray-100 flex justify-center p-4 item-center">
                        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17ZM17 10C13.134 10 10 13.134 10 17C10 20.866 13.134 24 17 24C20.866 24 24 20.866 24 17C24 13.134 20.866 10 17 10ZM16.5547 14.1679C16.2478 13.9634 15.8533 13.9443 15.5281 14.1183C15.203 14.2923 15 14.6312 15 15V19C15 19.3688 15.203 19.7077 15.5281 19.8817C15.8533 20.0557 16.2478 20.0366 16.5547 19.8321L19.5547 17.8321C19.8329 17.6466 20 17.3344 20 17C20 16.6656 19.8329 16.3534 19.5547 16.1679L16.5547 14.1679Z" fill="#5011cc"></path> </g></svg>
                    </a>
                    {props.user.uid == props.media.senderId ? null : <span style={{ color: "#5011CC" }} class="w-full text-right text-xs font-bold text-right float-right">{props.media.senderName}</span>}
                    <a href={props.media.downloadURL} target="_blank" download={props.media.fileName} class="block">{props.media.fileName}</a>
                    <div class="flex items-center justify-center gap-2 text-xs text-gray-500 float-right">
                        {props.formatTimestamp(props.media.timestamp)}
                        {!props.formatTimestamp(props.media.timestamp) ? <Loader /> : <TickIcon style={{ color: "#5011CC" }} class="w-5 h-5" />}
                    </div>
                </div>
            </div>
        </li>
    );
}

export default MediaMessage;