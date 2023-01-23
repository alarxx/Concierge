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

export default function Conversations({
                                          conversations=[],
                                          notifications=[],
                                          messages=[],
                                          openConversation=f=>f
}){
    const navigate = useNavigate();

    /** Не думаю что этот поиск последнего сообщения должен быть здесь */
    const [lastMessages, setLastMessages] = useState([])
    useEffect(()=>{
        // Оптимизировать!
        setLastMessages(conversations.map(c => {
            const ms = messages.filter(m => m.conversation == c.id)
            if(ms.length)
                return ms[ms.length-1].text ? ms[ms.length-1].text : ms[ms.length-1].type
        }))
    }, [messages])

    return (
        <Workflow>
            <Navbar title={"Мои заявки"}/>

            <Container>
                <ArchiveButton />
                <YummyButton name={"Заказать услугу"} icon={<CreateIcon/>} onClick={ e => navigate('/order')}/>

                <Chats>
                    {conversations.map((conversation, i) => {

                        return <ChatItem
                            key={i}
                            name={conversation.name}
                            unread_num={notifications.length}
                            last_message={lastMessages[i]}
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