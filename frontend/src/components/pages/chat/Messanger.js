import React, {useEffect, useState} from 'react'
import Navbar from "../../phone/Navbar";
import Container from "../../phone/Container";
import Message from "../../chat/Message";
import ControlPanel from "../../../../arch/ControlPanel";
import Workflow from "../../phone/Workflow";
import Day from "../../chat/Day";
import ChoiceForm from "../../chat/ChoiceForm";
import DocAttach from "../../chat/DocAttach";
import InputPanel from "../../chat/InputPanel";
import ChoicePanel from "../../chat/ChoicePanel";
import toggleArrayElement from "../../../handlers/toggleArrayElement";


//message: {type=form, id, items, selected, submitted}
export default function Messanger({ user, messages, setMessages=f=>f, closeChat, onSend=console.log, onChoice=f=>f }){

    const [formsSelected, setFormsSelected] = useState([])
    useEffect(()=>{
        const indexes = messages.reduce((acc, item, index) => {
            if(item.type!=='form') return acc;
            if (item.selected.length > 0 && !item.submitted) {
                acc.push(index);
            }
            return acc;
        }, []);
        setFormsSelected(indexes)
    },[])

    /*useEffect(()=>{
        console.log(formsSelected);
    }, [formsSelected])*/

    /*useEffect(()=>{
        console.log(messages)
    }, [messages])*/

    return (
        <Workflow>
            <Navbar title={"Имя консультанта"} back info onBackClick={closeChat}/>

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

                                                setFormsSelected(formSelected_prev => {
                                                    const newV = [...formSelected_prev]
                                                    const indexOfForm = newV.indexOf(messageIndex)
                                                    if(msg.selected.length===0) {
                                                        newV.splice(indexOfForm, 1)
                                                    } else {
                                                        if(indexOfForm === -1)
                                                            newV.push(messageIndex)
                                                    }
                                                    return newV;
                                                })

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
                {/*<DocAttach />*/}
            </Container>

            {formsSelected.length===0 &&
            <InputPanel onSend={onSend}/>}

            {/*Нужно сделать чтобы сообщение-форма помечалось как submitted и отправку нужно сделать и измененить состояние меседжс*/}
            {formsSelected.length!==0 &&
            <ChoicePanel onClick={e => {
                const messagesClone = [...messages]
                setFormsSelected(formsSelected.filter(i => {
                    console.log(`chose ${i}`, messagesClone[i])
                    messagesClone[i].submitted = true;
                    return false
                }))
                setMessages(messagesClone)
            }}/>}

            {/* Menu */}
        </Workflow>
    );
}