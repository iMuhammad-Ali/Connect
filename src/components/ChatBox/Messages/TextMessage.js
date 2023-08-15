import { ReactComponent as TickIcon } from "feather-icons/dist/icons/check.svg";
import Loader from "./Loader/Loader";
import Reaction from './Reaction';

const TextMessage = (props) => {
    return (
        <>
            <li key={props.index} class={props.user.uid === props.message.senderId ? "text-sm ml-10 mt-6 lg:mt-0 flex justify-end" : "text-sm mr-10 mt-6 lg:mt-0 flex justify-start"}>
                <div class={props.user.uid === props.message.senderId ? "flex items-center gap-1" : "flex items-center flex-row-reverse gap-1"}>
                    <Reaction
                        user={props.user}
                        message={props.message}
                        findMessageHandler={props.findMessageHandler}
                    />
                    <div class={props.user.uid === props.message.senderId ? "relative max-w-xs sm:max-w-md lg:max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded-2xl rounded-tr-sm shadow" : "relative max-w-xs sm:max-w-md lg:max-w-xl px-4 py-2 text-gray-700 bg-gray-300 rounded-2xl rounded-tl-sm shadow"}>
                        {props.user.uid === props.message.senderId ? null : <span style={{ color: "#5011CC" }} class="w-full text-right text-xs font-bold text-right float-right">{props.message.senderName}</span>}
                        <span class="block">{props.message.content}</span>
                        <div class="flex items-center justify-center gap-2 text-xs text-gray-500 float-right">
                            {props.formatTimestamp(props.message.timestamp)}
                            {!props.formatTimestamp(props.message.timestamp) ? <Loader /> : <TickIcon style={{ color: "#5011CC" }} class="w-5 h-5" />}
                        </div>
                    </div>
                </div>
            </li >
        </>
    );
};

export default TextMessage;

// reaction
//                         ?
//                         <div class={props.user.uid === props.message.senderId ? "z-10 absolute right-2 p-1 pb-2 bg-gray-800 text-xl rounded" : "z-10 absolute left-2 pb-2 bg-gray-800 p-1 text-xl rounded"}>
//                             <ul style={{ flexDirection: props.user.uid === props.message.senderId ? "" : "row-reverse" }}
//                                 class="flex gap-1 [&>*]:inline [&>*]:cursor-pointer [&>*]:p-1">
//                                 <li class={reactionEmoji === "\u{1F9E1}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F9E1}')}>&#x1F9E1;</li>
//                                 <li class={reactionEmoji === "\u{1F60A}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F60A}')}>&#128522;</li>
//                                 <li class={reactionEmoji === "\u{1F44D}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F44D}')}>&#128077;</li>
//                                 <li class={reactionEmoji === "\u{1F602}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F602}')}>&#128514;</li>
//                                 <li class={reactionEmoji === "\u{1F601}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F601}')}>&#128513;</li>
//                                 <li class={reactionEmoji === "\u{1F60D}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F60D}')}>&#128525;</li>
//                                 <li class={reactionEmoji === "\u{1F622}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F622}')}>&#128546;</li>
//                                 <li><CrossIcon onClick={reactionCloseHandler} class="mt-1 cursor-pointer text-gray-200" /></li>
//                             </ul>
//                             {props.message.reaction.length > 0 ?
//                                 <div class="bg-gray-600 max-h-24 overflow-y-scroll custom-scrollbar">
//                                     <p class="py-1 text-sm font-bold text-gray-300 text-center border-b border-gray-800">Reacted By:</p>
//                                     <ul class="text-base [&>*]:text-gray-400 [&>*]:text-sm [&>*]:font-semibold p-2 px-8 [&>*]:flex [&>*]:justify-between [&>*]:items-center [&>*]:mb-1">
//                                         {props.message.reaction.map((reaction) => {
//                                             return (
//                                                 <div>
//                                                     <span>{props.user.uid === reaction.userId ? "You" : reaction.userName}</span>
//                                                     <span class="p-1 bg-gray-300 rounded-full">{reaction.reaction}</span>
//                                                 </div>
//                                             )
//                                         })}
//                                     </ul>
//                                 </div> : null}
//                         </div>
//                         :
//                         <div onClick={reactionOpenHandler} class="bg-gray-200 p-1 text-xl rounded-full flex items-center justify-center">
//                             {props.message.reaction.length != 0 ?
//                                 <span class="flex items-center hover:cursor-pointer">
//                                     {props.user.uid === props.message.senderId ?
//                                         <>
//                                             {props.message.reaction[0].reaction}
//                                             {props.message.reaction.length >= 2 ? props.message.reaction[1].reaction : null}
//                                             <span class="text-sm font-bold text-gray-500">{props.message.reaction.length}</span>
//                                         </>
//                                         :
//                                         <>
//                                             <span class="text-sm font-bold text-gray-500">{props.message.reaction.length}</span>
//                                             {props.message.reaction[0].reaction}
//                                             {props.message.reaction.length >= 2 ? props.message.reaction[1].reaction : null}
//                                         </>
//                                     }
//                                 </span>
//                                 :
//                                 <PlusIcon class="hover:cursor-pointer text-gray-500" />}
//                         </div>