const FileInput = (props) => {
    return (
        <label for="fileInput">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24"
                stroke={props.file ? "#5011CC" : "currentColor"}>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <input disabled={props.recording} class="hidden" type="file" id="fileInput" onChange={props.handleFileChange} />
        </label>
    );
}

export default FileInput;