import React, {useEffect, useState} from 'react';

import {useNavigate} from "react-router-dom";

import Workflow from "../../components/phone/Workflow";
import Navbar from "../../components/phone/Navbar";
import Menu from "../../components/phone/Menu";
import Container from "../../components/phone/Container";
import ArchiveButton from "../../components/chat/ArchiveButton";
import Chats from "../../components/chat/Chats";
import YummyButton from "../../components/chat/YummyButton";
import ChatItem from "../../components/chat/ChatItem";
import CreateIcon from "../../assets/icons/arrow-right.svg"
import findIndexByKey from "../../handlers/findIndexByKey";

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
    const navigate = useNavigate();

    /** Не думаю что этот поиск последнего сообщения должен быть здесь */
    const [lastMessages, setLastMessages] = useState([])
    const [conversationNotifications, setConversationNotifications] = useState([])

    useEffect(()=>{
        // Нужно расфильтровать сообщения по коверсешнам и нотификейшны тоже
        // Оптимизировать!
        const lastMessages1 = []
        const conversationNotifications1 = []

        conversations.map((c, i) => {
            conversationNotifications1.push(0);

            const ms = messages.filter(m => m.conversation == c.id)

            if(ms.length){
                const lastMessage = ms[ms.length-1]
                lastMessages1.push(lastMessage.text ? lastMessage.text : lastMessage.type);
            }

            ms.map(m => {
                const index = findIndexByKey({array: notifications, id: m.id, key:'message'})
                if(index !== -1)
                    conversationNotifications1[i]++;
            });
        })

        console.log("lastMessages", lastMessages1);
        setLastMessages(lastMessages1)
        setConversationNotifications(conversationNotifications1)
    }, [notifications]) // нужно ли нам перерисовывать conversation, без изменения уведомлений? У нас всегда новое сообщение сопровождается уведомлением

    return (
        <Workflow>
            <Navbar title={"Мои заявки"}/>

            <Container>
                <ArchiveButton />

                {chatLoading && <p style={{textAlign:"center", margin: "3rem"}}>loading...</p>}

                <YummyButton name={"Заказать услугу"} icon={<CreateIcon/>} onClick={ e => navigate('/order')}/>

                <Chats>
                    {conversations.map((conversation, i) => {
                        return <ChatItem
                            key={i}
                            name={conversation.name}
                            unread_num={i < conversationNotifications.length ? conversationNotifications[i] : 0}
                            last_message={truncateString(lastMessages[i])}
                            onClick={e => openConversation(conversation)}
                        />
                    })}
                </Chats>


            </Container>

            <Menu />
        </Workflow>
    );
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