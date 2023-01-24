import React, {useEffect} from 'react'



export default function Message({
                                    message,
                                    user,
}){

    const mymssg = message.sender == user.id;
    const text = message.text;
    const time = message.createdDate;

    useEffect(()=>{
        console.log("", message.createdDate)

    }, []);

    return (
        <div className={`${mymssg?'chat-message__wrapper':''}  ${mymssg?'mymssg':''}`}>
            <div className={`chat-message`}>
                <div className="chat-message__text">
                    {text}
                </div>
                <div className="chat-message__time">
                    {time}
                </div>
            </div>

        </div>
    );
}