/**
 * Messenger отображает все сообщения и еще должен отвечать за контроль панель
 * */
import React, {useEffect, useState} from 'react'
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


//message: {type=choice, id, items, selected, submitted}
export default function Messanger({
    conversation,
    user,
    messages=[],
    _upsertMessage=f=>f,
    closeConversation=f=>f,
    sendMessage=f=>f,
}){

    /*useEffect(()=>{
        const indexes = messages.reduce((acc, item, index) => {
            if(item.type!=='choice') return acc;
            if (item.selected.length > 0 && !item.submitted) {
                acc.push(index);
            }
            return acc;
        }, []);
        setFormsSelected(indexes)
    }, [messages])*/

    const [control, setControl] = useState('text');
    const [formsSelected, setFormsSelected] = useState([])
    const [isAttach, setIsAttach] = useState(false);

    useEffect(()=>{
        if(formsSelected.length !== 0)
            setControl('choice')
        else if(isAttach)
            setControl('attach')
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
    function onChoiceSend(choice){
        console.log(choice);
    }
    function onFileSend(file){}


    return (
        <Workflow>
            <Navbar title={conversation.name} back info onBackClick={closeConversation}/>

            <Container chat>
                {messages.map((message, messageIndex) => {
                    if(message.type==='text'){
                        return (
                            <Message key={messageIndex}
                                     text={message.text}
                                     time={message.time}
                                     mymssg={message.sender === user.id}
                            />
                        );
                    }
                    else if(message.type==='file') {
                        return (<Document key={messageIndex} message={message} />);
                    }
                    else if(message.type==='choice'){
                        // В messageForm должно отличаться только selected,
                        // Как еще можно решить проблему куда именно вставлять selected? Чувствую что можно подругому
                        /**/
                        return (
                            <ChoiceForm key={messageIndex}
                                        message={message}
                                        onItem={
                                            service => {
                                                if(!message.choice.submitted) {

                                                    console.log("Messenger select", message, service);

                                                    /*const services = message.choice.multiple_choice ?
                                                        toggleArrayElement(message.choice.selectedServices, service.id):
                                                        message.choice.selectedServices.includes(service.id)?[]:[service.id]

                                                    console.log(services);

                                                    const messageClone = [...message]
                                                    messageClone.choice.selectedServices.push(services)

                                                    _upsertMessage(messageClone)*/

                                                }
                                            }
                                        }
                                        onAnother={message => console.log("another", message)}
                            />
                        );
                    }
                })}

                {/*<Day day={"Сегодня"}/>*/}

            </Container>

            {control ==='text' &&
                <InputPanel
                    onLeftClick={e => setIsAttach(true)}
                    onSend={onTextSend}
                />
            }
            {control === 'choice' &&
                <ChoicePanel
                    onClick={
                        e => {
                            const messagesClone = [...messages]
                            setFormsSelected(formsSelected.filter(i => {
                                console.log(`chose ${i}`, messagesClone[i])
                                messagesClone[i].submitted = true;
                                return false
                            }))
                            setMessages(messagesClone)
                            // Отправка на сервер наверное с помощью onSend хз
                        }
                    }
                />
            }
            {control === 'attach' &&
                <AttachPanel title="Выберите паттерн" onClose={e=>setIsAttach(false)}>
                    <ServicesPanel/>
                </AttachPanel>
            }

            {/* Menu */}
        </Workflow>
    );
}