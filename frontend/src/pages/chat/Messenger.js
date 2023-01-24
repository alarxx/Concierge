/**
 * Messenger отображает все сообщения и еще должен отвечать за контроль панель
 * */
import React, {useEffect, useRef, useState} from 'react'
import Navbar from "../../components/phone/Navbar";
import Container from "../../components/phone/Container";
import Message from "../../components/chat/Message";
import ControlPanel from "../../../arch/ControlPanel";
import Workflow from "../../components/phone/Workflow";
import Day from "../../components/chat/Day";
import ChoiceForm from "../../components/chat/ChoiceForm";
import Document from "../../components/chat/Document";
import InputPanel from "../../components/chat/InputPanel";
import ChoicePanel from "../../components/chat/ChoicePanel";
import toggleArrayElement from "../../handlers/toggleArrayElement";
import AttachPanel from '../../components/chat/AttachPanel';

import ActionButtons from "../../components/chat/ActionsButtons"
import ServicesPanel from "../../components/partners/ServicesPanel"
import findIndexById from "../../handlers/findIndexById";

function objClone(obj){
    return JSON.parse(JSON.stringify(obj))
}

//message: {type=choice, id, items, selected, submitted}
export default function Messenger({
    conversation,
    user,
    messages=[],
    _upsertMessage=f=>f,
    closeConversation=f=>f,
    sendMessage=f=>f,
}){

    /**
     * Всегда когда меняется состояние сообщений мы пересчитываем messagesSelected для choice form,
     * В них хранятся именно message.id, потом мы должны будем найти сам message из массива, зная его id
     * */
    useEffect(()=>{
        const ids = messages.reduce((acc, message, index) => {
            if(message.type !== 'choice' || message.choice.submitted) return acc;
            if (message.choice.selectedServices.length > 0) {
                acc.push(message.id);
            }
            return acc;
        }, []);
        setMessagesSelected(ids)
    }, [messages])

    const [control, setControl] = useState('text');
    const [messagesSelected, setMessagesSelected] = useState([])
    const [isAttach, setIsAttach] = useState(false);
    const [action, setAction] = useState('actions');

    useEffect(()=>{
        if(messagesSelected.length !== 0)
            setControl('choice')
        else if(isAttach){
            setControl('attach')
        }
        else
            setControl('text')
    })

    function onTextSend(text){
        sendMessage({
            conversation: conversation.id,
            type: 'text',
            text: text,
        })
    }
    function onChoiceSend(){
        // Нужно найти нужные сообщения, поставить им значения submitted и отправить на сервер.
        messagesSelected.map(id => {
            const index = findIndexById(messages, id)
            const message = messages[index];
            sendMessage(message);
        })
        setMessagesSelected([]);
    }

    function onFileSend(file){

    }

    /**
     * Upsert selected service to messages selectedServices if message type is choice, and it wasn't submitted.
     * Мы не отправляем это изменение, выборы видны только у клиента.
     * При перезагрузке страницы выборы исчезнут.
     * */
    function selectService(message, service){
        if(!message.choice.submitted) {
            if(message.sender == user.id) return;
            // console.log("Messenger select", message, "\nSelected service", service);
            const services = message.choice.multiple_choice ?
                toggleArrayElement(message.choice.selectedServices, service.id):
                message.choice.selectedServices.includes(service.id) ? [] : [service.id]
            // console.log(services);
            const messageClone = objClone(message) // Копирование объекта
            messageClone.choice.selectedServices = services
            // console.log("message clone", messageClone);
            _upsertMessage(messageClone)
        }
    }

    const [lastDate, setLastDate] = useState();

    return (
        <Workflow>
            <Navbar title={conversation.name} back info onBackClick={closeConversation}/>

            <Container chat>
                {messages.map((message, messageIndex) => {
                    if(message.type==='text'){
                        return (
                            <div key={messageIndex}>
                                <Day date={message.createdDate} lastDate={lastDate} setLastDate={setLastDate}/>
                                <Message message={message}
                                         user={user}
                                />
                            </div>
                        );
                    }
                    else if(message.type==='file') {
                        return (
                            <div key={messageIndex}>
                                <Day date={message.createdDate} lastDate={lastDate} setLastDate={setLastDate}/>
                                <Document message={message} />
                            </div>
                        );
                    }
                    else if(message.type==='choice'){
                        // В messageForm должно отличаться только selected,
                        // Как еще можно решить проблему куда именно вставлять selected? Чувствую что можно подругому
                        /**/
                        return (
                            <div key={messageIndex}>
                                <Day date={message.createdDate} lastDate={lastDate} setLastDate={setLastDate}/>
                                <ChoiceForm user={user}
                                            message={message}
                                            onServiceSelect={service => selectService(message, service)}
                                            onAnother={message => console.log("another", message)}
                                />
                            </div>
                        );
                    }
                })}


            </Container>

            {control ==='text' &&
                <InputPanel
                    onLeftClick={e => {
                        setIsAttach(true)
                        setAction('actions')
                    }}
                    onSend={text => onTextSend(text)}
                />
            }
            {control === 'choice' &&
                <ChoicePanel
                    onClick={e => onChoiceSend()}
                />
            }
            {control === 'attach' &&
                <AttachPanel
                    title="Выберите паттерн"
                    onClose={ e => {
                        setIsAttach(false)
                        setAction('actions')
                    }}
                >
                    {action === 'actions' &&
                        <ActionButtons setAction={action => setAction(action)}/>
                    }
                    {action === 'offer services' &&
                        <ServicesPanel />
                    }
                </AttachPanel>
            }

            {/* Menu */}
        </Workflow>
    );
}