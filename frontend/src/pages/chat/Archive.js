import React, {useEffect, useState} from 'react';
import Navbar from "../../components/phone/Navbar";
import Workspace from "../../components/phone/Workspace";
import ArchiveButton from "../../components/chat/ArchiveButton";
import YummyButton from "../../components/chat/YummyButton";
import CreateIcon from "../../assets/icons/arrow-right.svg";
import Chats from "../../components/chat/Chats";
import ChatItem from "../../components/chat/ChatItem";
import Menu from "../../components/phone/Menu";
import Workflow from "../../components/phone/Workflow";
import {useNavigate} from "react-router-dom";
import findIndexByKey from "../../handlers/findIndexByKey";

/*
            <div className="menu">
                <div className="menu__wrapper">
                    <ul className="menu__links">
                        <li className="menu__li">
                            <div className="menu__icon">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.83325 11.6668H8.16659C10.4999 11.6668 11.6666 10.5002 11.6666 8.16683V5.8335C11.6666 3.50016 10.4999 2.3335 8.16659 2.3335H5.83325C3.49992 2.3335 2.33325 3.50016 2.33325 5.8335V8.16683C2.33325 10.5002 3.49992 11.6668 5.83325 11.6668Z"
                                        stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M19.8333 11.6668H22.1666C24.4999 11.6668 25.6666 10.5002 25.6666 8.16683V5.8335C25.6666 3.50016 24.4999 2.3335 22.1666 2.3335H19.8333C17.4999 2.3335 16.3333 3.50016 16.3333 5.8335V8.16683C16.3333 10.5002 17.4999 11.6668 19.8333 11.6668Z"
                                        stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M19.8333 25.6668H22.1666C24.4999 25.6668 25.6666 24.5002 25.6666 22.1668V19.8335C25.6666 17.5002 24.4999 16.3335 22.1666 16.3335H19.8333C17.4999 16.3335 16.3333 17.5002 16.3333 19.8335V22.1668C16.3333 24.5002 17.4999 25.6668 19.8333 25.6668Z"
                                        stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                    <path
                                        d="M5.83325 25.6668H8.16659C10.4999 25.6668 11.6666 24.5002 11.6666 22.1668V19.8335C11.6666 17.5002 10.4999 16.3335 8.16659 16.3335H5.83325C3.49992 16.3335 2.33325 17.5002 2.33325 19.8335V22.1668C2.33325 24.5002 3.49992 25.6668 5.83325 25.6668Z"
                                        stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </li>
                        <li className="menu__li">
                            <div className="menu__icon">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M25.6666 7.29183V13.2418C25.6666 14.7235 25.1766 15.9718 24.3016 16.8352C23.4383 17.7102 22.7499 17.5002 22.1666 17.5002L21.5833 20.3935C21.5833 21.1868 19.2499 19.2502 18.1882 19.2151V14.4669C18.1882 12.0869 16.6016 10.5002 14.2216 10.5002H6.29991C6.13658 10.5002 5.98492 10.5119 5.83325 10.5235V7.29183C5.83325 4.31683 7.81659 2.3335 10.7916 2.3335H20.7083C23.6833 2.3335 25.6666 4.31683 25.6666 7.29183Z"
                                        stroke="white" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                                    <path
                                        d="M18.1882 14.4667V19.215C18.1882 19.635 18.1416 20.0316 18.0366 20.3933C17.6049 22.1083 16.1816 23.1817 14.2216 23.1817H11.0483L7.52491 25.5267C6.99991 25.8883 6.29991 25.5033 6.29991 24.8733V23.1817C5.10991 23.1817 4.11825 22.785 3.42992 22.0967C2.72992 21.3967 2.33325 20.405 2.33325 19.215V14.4667C2.33325 12.25 3.70992 10.7217 5.83325 10.5234C5.98492 10.5117 6.13658 10.5 6.29991 10.5H14.2216C16.6016 10.5 18.1882 12.0867 18.1882 14.4667Z"
                                        stroke="white" stroke-opacity="0.8" stroke-width="1.5" stroke-miterlimit="10"
                                        stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </li>
                        <li className="menu__li">
                            <div className="menu__icon">
                                <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.7">
                                        <path d="M15.6223 6.10938H23.509" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.49121 6.11035H10.3779" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.6223 16.6074H23.509" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15.6223 23.1719H23.509" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M19.5967 10.0423V2.1665" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M2.49121 23.8334L10.3779 15.9575" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M10.3779 23.8334L2.49121 15.9575" stroke="white" stroke-width="1.5"
                                              stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                </svg>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

* */

export default function Archive({conversations=[]}){
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

        setLastMessages(lastMessages1)
        setConversationNotifications(conversationNotifications1)
    }, []) // нужно ли нам перерисовывать conversation, без изменения уведомлений? У нас всегда новое сообщение сопровождается уведомлением


    return (
        <Workflow>
            <Navbar title={"Архив"} back onBackClick={e => navigate(-1)}/>

            <Workspace>
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

                <div className="secondarytext tac">В архиве хранится информация о завершившихся или отмененных командировках</div>

            </Workspace>

            <Menu />
        </Workflow>
    );
}