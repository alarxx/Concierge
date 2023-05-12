import React, {useEffect, useMemo, useState} from 'react';

import {useNavigate} from "react-router-dom";

import ChatItemCard from "../../../widgets/chat/chat_item_card/ChatItemCard";
import Logger from "../../../internal/Logger";

function findIndexByKey({array, key, id}) {
    return array.findIndex(obj => obj[key] === id);
}
function truncateString(str) {
    // console.log("last message", str);
    if(!str) return str;
    if (str.length > 40) {
        return str.slice(0, 37) + "...";
    }
    return str;
}

export default function Conversations({
                                          conversations=[],
                                          notifications=[],
                                          messages=[],
                                          chatLoading=true,
                                          openConversation=f=>f
                                      }){
    const logger = useMemo(()=>new Logger('Conversations'), []);

    const navigate = useNavigate();

    /** Не думаю что этот поиск последнего сообщения должен быть здесь */
    const [lastMessagesDateDESC, setLastMessagesDateDESC] = useState([])
    const [conversationNotifications, setConversationNotifications] = useState([])

    useEffect(()=>{
        // Нужно расфильтровать сообщения по коверсешнам и нотификейшны тоже
        // Оптимизировать!
        const lastMessages = []
        const conversationNotifications1 = []

        conversations.map((conversation, index) => {
            conversationNotifications1.push(0);
            lastMessages.push({conversationIndex: index});

            const conv_ms = messages.filter(m => m.conversation == conversation.id)

            if(conv_ms.length){
                const lastMessage = conv_ms[conv_ms.length-1]
                lastMessages[index] = {...lastMessages[index], ...lastMessage};

                conv_ms.map(m => {
                    const i = findIndexByKey({array: notifications, id: m.id, key:'message'}) // notification ключ(message) которого равен message.id
                    if(i !== -1) {
                        conversationNotifications1[index]++;
                    }
                });
            }

        })
        setConversationNotifications(conversationNotifications1)

        const asc = lastMessages.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
        setLastMessagesDateDESC(asc)

    }, [conversations, notifications]) // нужно ли нам перерисовывать conversation, без изменения уведомлений? У нас всегда новое сообщение сопровождается уведомлением

    return (<>
        {lastMessagesDateDESC.map( (lastMessage, key) => {
            const i = lastMessage.conversationIndex;
            const conversation = conversations[i];

            return (<div key={key}>
                <ChatItemCard
                    name={conversation.name}
                    unread_num={conversationNotifications[i] ? conversationNotifications[i] : 0}
                    last_message={lastMessage.text ? truncateString(lastMessage.text) : lastMessage.type}
                    onClick={e => openConversation(conversation)}
                />
            </div>);
        })}
    </>);
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/