import React, {useEffect, useState} from 'react'

export default function ChatItem({ unread_num, name, last_message, onClick }){
    return (
        <div className={`chat-item ${ unread_num > 0 ? 'unreaded' : '' }`} onClick={onClick}>
            <div className="chat-item__photo">

            </div>
            <div className="chat-item__info">
                <div className="chat-item__name">
                    {name}
                </div>
                <div className="chat-item__mssg">
                    {last_message}
                </div>
            </div>

            {unread_num > 0 && <div className="unreaded__num">{unread_num}</div>}
        </div>
    );
}