import React, {useEffect, useRef} from 'react'

import ChatMessage from "../../../features/chat/chat_message/ChatMessage";
import FileInChat from "../../../features/chat/file_in_chat/FileInChat";
import ImageInChat from "../../../features/chat/image_in_chat/ImageInChat";

export default function Message({ message, user }){

    if(message.type==='text'){
        return (<ChatMessage message={message} user={user} />);
    }
    else if(message.type==='file') {
        return (<FileInChat message={message} user={user} />);
    }
    else if(message.type==='image') {
        return (<ImageInChat message={message} user={user} />);
    }
}