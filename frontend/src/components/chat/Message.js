import React, {useEffect, useRef} from 'react'

function zero(time){
    return `${time<10?'0':''}`
}
function messageTime(message){
    const date = new Date(message.createdDate);
    return `${zero(date.getHours())}${date.getHours()} : ${zero(date.getMinutes())}${date.getMinutes()}`
}

export default function Message({
                                    message,
                                    user,
}){

    const mymssg = message.sender == user.id;

    return (
        <div className={`${mymssg?'chat-message__wrapper':''}  ${mymssg?'mymssg':''}`}>
            <div className={`chat-message`}>
                <div className="chat-message__text">
                    {message.text}
                </div>
                <div className="chat-message__time">
                    {messageTime(message)}
                </div>
            </div>

        </div>
    );
}