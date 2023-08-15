import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus.svg";
import { ReactComponent as CrossIcon } from "feather-icons/dist/icons/x.svg";
import { useState } from "react";

const Reaction = (props) => {
    const [reaction, setReaction] = useState(false);
    const [reactionEmoji, setReactionEmoji] = useState("");
    const reactionOpenHandler = () => {
        setReaction(true);
    }
    const reactionCloseHandler = () => {
        setReaction(false);
    }
    const reactionHandler = (emoji) => {
        if (reactionEmoji === emoji) {
            setReactionEmoji("");
        } else {
            setReactionEmoji(emoji);
        }
        props.findMessageHandler(props.message, emoji, props.user);
        setReaction(false);
    }
    return (
        <>
            {reaction ?
                <div style={{ backgroundColor: '#4f11cc1b' }} class="z-10 fixed top-0 left-0 w-screen h-screen flex items-center justify-center lg:pr-96">
                    <div class={props.user.uid === props.message.senderId ? "z-10 p-1 pb-2 bg-gray-800 text-xl rounded" : "z-10 pb-2 bg-gray-800 p-1 text-xl rounded"}>
                        <ul style={{ flexDirection: props.user.uid === props.message.senderId ? "" : "row-reverse" }}
                            class="flex gap-1 [&>*]:inline [&>*]:cursor-pointer [&>*]:p-1">
                            <li class={reactionEmoji === "\u{1F44D}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F44D}')}>&#128077;</li>
                            <li class={reactionEmoji === "\u{1F9E1}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F9E1}')}>&#x1F9E1;</li>
                            <li class={reactionEmoji === "\u{1F60A}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F60A}')}>&#128522;</li>
                            <li class={reactionEmoji === "\u{1F602}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F602}')}>&#128514;</li>
                            <li class={reactionEmoji === "\u{1F601}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F601}')}>&#128513;</li>
                            <li class={reactionEmoji === "\u{1F60D}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F60D}')}>&#128525;</li>
                            <li class={reactionEmoji === "\u{1F622}" ? "bg-gray-300 rounded-full" : ""} onClick={() => reactionHandler('\u{1F622}')}>&#128546;</li>
                            <li><CrossIcon onClick={reactionCloseHandler} class="mt-1 cursor-pointer text-gray-200" /></li>
                        </ul>
                        {props.message.reaction.length > 0 ?
                            <div class="bg-gray-600 max-h-1/2 overflow-y-scroll custom-scrollbar">
                                <p class="py-1 text-sm font-bold text-gray-300 text-center border-b border-gray-800">Reacted By:</p>
                                <ul class="text-base [&>*]:text-gray-400 [&>*]:text-sm [&>*]:font-semibold p-2 px-8 [&>*]:flex [&>*]:justify-between [&>*]:items-center [&>*]:mb-1">
                                    {props.message.reaction.map((reaction) => {
                                        return (
                                            <div>
                                                <span>{props.user.uid === reaction.userId ? "You" : reaction.userName}</span>
                                                <span class="p-1 bg-gray-300 rounded-full">{reaction.reaction}</span>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div> : null}
                    </div>
                </div>
                :
                <div onClick={reactionOpenHandler} class="bg-gray-200 p-1 text-xl rounded-full flex items-center justify-center">
                    {props.message.reaction.length !== 0 ?
                        <span class="flex items-center hover:cursor-pointer">
                            {props.user.uid === props.message.senderId ?
                                <>
                                    {props.message.reaction[0].reaction}
                                    {props.message.reaction.length >= 2 ? props.message.reaction[1].reaction : null}
                                    <span class="text-sm font-bold text-gray-500">{props.message.reaction.length}</span>
                                </>
                                :
                                <>
                                    <span class="text-sm font-bold text-gray-500">{props.message.reaction.length}</span>
                                    {props.message.reaction[0].reaction}
                                    {props.message.reaction.length >= 2 ? props.message.reaction[1].reaction : null}
                                </>
                            }
                        </span>
                        :
                        <PlusIcon class="hover:cursor-pointer text-gray-500" />}
                </div>
            }
        </>
    )
}

export default Reaction