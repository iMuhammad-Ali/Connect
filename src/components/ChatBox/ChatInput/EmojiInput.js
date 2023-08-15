import EmojiPicker from 'emoji-picker-react';

const EmojiInput = (props) => {
    return (
        <>
            <button onClick={props.emojiPickerStateHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-500" fill="none" viewBox="0 0 24 24"
                    stroke={props.showEmojiPicker ? '#ffbb00' : "currentColor"}>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            {props.showEmojiPicker && (
                <div class="absolute bottom-16 left-1 z-50 w-32">
                    <EmojiPicker
                        onEmojiClick={(emoji) => props.addEmojiHandler(emoji)}
                        theme="dark"
                        emojiStyle=""
                        width="300px"
                        height="400px"
                        // lazyLoadEmojis={true}
                        searchPlaceholder="Search Emoji"
                        searchDisabled={true}
                        previewConfig={null}
                    />
                </div>)}
        </>
    );
}

export default EmojiInput;