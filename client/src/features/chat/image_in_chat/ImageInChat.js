import React from 'react';

import MessageWrapper from "../message_wrapper/MessageWrapper";

export default function ImageInChat({ message, user }){

    if(!message.isDelivered){
        return (<>
            <MessageWrapper message={message} user={user}>
                (отправляется)
            </MessageWrapper>
        </>);
    }

    return (<>
        <MessageWrapper message={message} user={user}>
            <img src={`/file/${message.image}`} style={{width:'100%'}}/>
        </MessageWrapper>
    </>);
}