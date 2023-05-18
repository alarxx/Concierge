/**
 * Messenger отображает все сообщения и еще должен отвечать за контроль панель
 * */
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import ChatInputForm from "../../features/chat/chat_input_form/ChatInputForm";
import ChatMessage from "../../features/chat/chat_message/ChatMessage";
import DayInChat from "../../features/chat/day_in_chat/DayInChat";
import NavbarPanel from "../../widgets/navbar_panel/NavbarPanel";
import NavbarLeft from "../../shared/ui/navbar/NavbarLeft";

import BackIcon from "../../assets/icons/backbtn_icon.svg";
import Logger from "../../internal/Logger";
import FileInChat from "../../features/chat/file_in_chat/FileInChat";
import BottomPanel from "../../shared/ui/bottom_panel/BottomPanel";
import Button from "../../shared/ui/button/Button";

import findIndexById from "../../internal/findIndexById";
import objClone from "../../internal/objClone";
import {useAppContext} from "../../context/AppContext";
import getOrderInfo from "../../internal/order/getOrderInfo";
import Message from "../../features/chat/message/Message";
import Container from "../../shared/ui/box/Container";

//message: {type=choice, id, items, selected, submitted}
export default function Messenger({
                                      conversation,
                                      closeConversation=f=>f,
                                  }){
    const logger = useMemo(()=>new Logger('Messenger'), []);

    const { authHandler, orderHandler, chatHandler } = useAppContext();

    const {user} = authHandler;

    const {deleteNotifications, messages} = chatHandler;
    const conversationMessages = messages.filter(m => m.conversation === conversation.id);

    const { orders } = orderHandler;
    const orderInfo = getOrderInfo(orders.find(o => o.conversation == conversation.id));

    /** Delete notifications on open conversation (Messenger) */
    useEffect(()=>{
        logger.log('deleteNotifications', {conversation});
        deleteNotifications(conversation.id);
    }, [messages]);


    const [control, setControl] = useState('text');  // ['text', 'choice']


    /** Индекс сообщения, перед которым нужно отобразить новый день */
    const [newDates, setNewDates] = useState([]);
    useEffect(()=>{
        const indexes = [];
        let lastDate = null;
        conversationMessages.map((message, i)=>{
            const date = new Date(message.createdAt);
            if(!lastDate || date.getDate() != lastDate.getDate()){
                lastDate = date
                indexes.push(i)
            }
        })
        setNewDates(indexes)
    }, [messages])

    return (
        <>
            <Container>
                <NavbarPanel
                    LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={closeConversation} />}
                    title={user.role === 'admin' ? orderInfo.customerName : (orderInfo.managerName)}
                />

                {conversationMessages.map((message, messageIndex) => {
                    if(message.type==='text'){
                        console.log(message)

                        return (
                            <div key={messageIndex}>
                                {newDates.includes(messageIndex) && <DayInChat date={new Date(message.createdAt)}/>}
                                <ChatMessage
                                    message={message}
                                    user={user}
                                />
                            </div>
                        );
                    }
                    else if(message.type==='file') {
                        logger.log('FILE MESSAGE', {message})
                        return (
                            <div key={messageIndex}>
                                {newDates.includes(messageIndex) && <DayInChat date={new Date(message.createdAt)}/>}
                                <FileInChat message={message} user={user}/>
                            </div>
                        );
                    }
                    else if(message.type==='image') {
                        logger.log('IMAGE MESSAGE', {message})
                        return (
                            <div key={messageIndex}>
                                {newDates.includes(messageIndex) && <DayInChat date={new Date(message.createdAt)}/>}
                                <Message message={message} user={user}>
                                    <img src={`/file/${message.image}`} style={{width:'100%'}}/>
                                </Message>
                            </div>
                        );
                    }
                })}



                <BottomPanel>
                    {control ==='text' &&
                        <ChatInputForm
                            conversation={conversation}
                        />
                    }
                    {control === 'choice' &&
                        <Button onClick={e => e}>Сделать выбор</Button>
                    }
                </BottomPanel>

            </Container>
        </>
    );
}