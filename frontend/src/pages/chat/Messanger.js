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

//message: {type=form, id, items, selected, submitted}
export default function Messanger({
                                      conversation,
                                      user,
                                      messages,
                                      setMessages=f=>f,
                                      closeConversation=f=>f,
                                      sendMessage=f=>f,
                                      onChoice=f=>f,
                                  }){


    /*useEffect(()=>{
        const indexes = messages.reduce((acc, item, index) => {
            if(item.type!=='form') return acc;
            if (item.selected.length > 0 && !item.submitted) {
                acc.push(index);
            }
            return acc;
        }, []);
        setFormsSelected(indexes)
    }, [messages])*/

    const [control, setControl] = useState();
    const [formsSelected, setFormsSelected] = useState([])
    const [isAttach, setIsAttach] = useState(false);

    useEffect(()=>{
        if(formsSelected.length !== 0)
            setControl('choice')
        else if(isAttach){
            setControl('attach')
        }
        else{
            setControl('input')
        }
    })

    function onSend(text){
        sendMessage({
            conversation: conversation.id,
            type: 'text',
            text: text,
        })
    }

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
                    else if(message.type==='form'){
                        // В messageForm должно отличаться только selected,
                        // Как еще можно решить проблему куда именно вставлять selected? Чувствую что можно подругому
                        return (
                            <ChoiceForm key={messageIndex}
                                        message={message}
                                        onItem={(item) => {
                                            if(!message.submitted) {
                                                const msg = message.multiple_choice ?
                                                    {...message, selected: toggleArrayElement(message.selected, item.service)} :
                                                    {...message, selected: message.selected.includes(item.service)?[]:[item.service]}

                                                const messagesCopy = [...messages];
                                                messagesCopy[messageIndex] = msg
                                                setMessages(messagesCopy);
                                            }
                                        }}
                                        onAnother={message => console.log("another", message)}
                            />
                        );
                    }
                })}

                {/*<Day day={"Сегодня"}/>*/}

            </Container>

            {control==='choice' &&
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

            {control==='input' &&
                <InputPanel
                    onLeftClick={e => setIsAttach(true)}
                    onSend={onSend}
                />
            }
            {control==='attach' &&
                <AttachPanel title="Выберите паттерн" onClose={e=>setIsAttach(false)}>
                    <ServicesPanel/>
                </AttachPanel>
            }

            {/* Menu */}
        </Workflow>
    );
}