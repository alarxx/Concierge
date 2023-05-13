/**
 * Messenger отображает все сообщения и еще должен отвечать за контроль панель
 * */
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import ChatInputForm from "../../../features/chat/chat_input_form/ChatInputForm";
import ChatMessage from "../../../features/chat/chat_message/ChatMessage";
import DayInChat from "../../../features/chat/day_in_chat/DayInChat";
import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import NavbarLeft from "../../../shared/ui/navbar/NavbarLeft";
import Box from "../../../shared/ui/box/Box";
import Container from "../../../shared/ui/box/Container";

import BackIcon from "../../../assets/icons/backbtn_icon.svg";
import ChatDocument from "./ChatDocument";
import ChatChoiceForm from "./ChatChoiceForm";
import ChatChoicePanel from "./ChatChoicePanel";
// import ChatAttachPanel from "./ChatAttachPanel";
import ChatActionButtons from "./ChatActionButtons";
import ChatServicePanel from "./ChatServicePanel";
import Logger from "../../../internal/Logger";

function findIndexById (array, id) {
    return array.findIndex(obj => obj.id === id);
}
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
    const logger = useMemo(()=>new Logger('Messenger'), []);

    const navigate = useNavigate();

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

    function dropAttachPanel(){
        setControl('text');
        setAction('actions');
        setIsAttach(false);
    }

    // const [lastDate, setLastDate] = useState();

    useEffect(()=>{
        if(action === 'request files'){
            onFileRequest();
            dropAttachPanel();
        }
        else if(messagesSelected.length !== 0)
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
    function onChoiceSend(){
        // Нужно найти нужные сообщения, поставить им значения submitted и отправить на сервер.
        messagesSelected.map(id => {
            const index = findIndexById(messages, id)
            const message = messages[index];
            sendMessage(message);
        })
        setMessagesSelected([]);
    }
    function onChoiceRequest(services){
        console.log("onChoiceRequest", services);
        sendMessage({
            conversation: conversation.id,
            type: 'choice',
            choice: {
                services,
                selectedServices: [],
                multiple_choice: true,
                submitted: false,
            }
        });
        dropAttachPanel();
    }


    function onFileRequest(){
        sendMessage({
            conversation: conversation.id,
            type: 'file',
        })
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

    /** Индекс сообщения, перед которым нужно отобразить новый день */
    const [newDates, setNewDates] = useState([]);
    useEffect(()=>{
        const indexes = [];
        let lastDate = null;
        messages.map((message, i)=>{
            const date = new Date(message.createdDate);
            if(!lastDate || date.getDate() != lastDate.getDate()){
                lastDate = date
                indexes.push(i)
            }
        })
        setNewDates(indexes)
    }, [messages])

    return (
        <>
            <NavbarPanel
                LeftButton={<NavbarLeft Icon={<BackIcon />} onClick={closeConversation} />}
                title={conversation.name}
            />
            {/*<div className={styles.hotel__list} style={{ height: "100%", overflow: 'auto' }}>*/}
            {/*    <InfiniteScroll*/}
            {/*        pageStart={0}*/}
            {/*        loadMore={loadMore}*/}
            {/*        hasMore={hasMore}*/}
            {/*        loader={*/}
            {/*            <div className="loader" key={0}>*/}
            {/*                Loading ...*/}
            {/*            </div>*/}
            {/*        }*/}
            {/*        isReverse={true}*/}
            {/*        useWindow={false}*/}
            {/*    >*/}
            {/*        {items.map((item, i) => (*/}
            {/*            <HotelCard key={i} title={item.name} price={'от 50,000 KZT '} addInfo={'2 взрослых, 2 ночи'} onClick={e => onRoomClick(item)} />*/}
            {/*        ))}*/}
            {/*    </InfiniteScroll>*/}
            {/*</div>*/}
            {messages.map((message, messageIndex) => {
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
                    return (
                        <div key={messageIndex}>
                            {newDates.includes(messageIndex) && <DayInChat date={new Date(message.createdDate)}/>}
                            <ChatDocument message={message} user={user} onFileLoad={onFileLoad}/>
                        </div>
                    );
                }
                // else if(message.type==='choice'){
                //     // В messageForm должно отличаться только selected,
                //     // Как еще можно решить проблему куда именно вставлять selected? Чувствую что можно подругому
                //     /**/
                //     return (
                //         <div key={messageIndex}>
                //             {newDates.includes(messageIndex) && <DayInChat date={new Date(message.createdDate)}/>}
                //             <ChatChoiceForm
                //                 user={user}
                //                 message={message}
                //                 onServiceSelect={service => selectService(message, service)}
                //                 onAnother={message => console.log("another", message)}
                //             />
                //         </div>
                //     );
                // }
            })}

            {/*<NavigationPanel />*/}




            {control ==='text' &&
                <ChatInputForm
                    onLeftClick={e => {
                        setIsAttach(true)
                        setAction('actions')
                    }}
                    onSend={text => onTextSend(text)}
                />
            }
            {control === 'choice' &&
                <ChatChoicePanel
                    onClick={e => onChoiceSend()}
                />
            }
            {/*{control === 'attach' &&*/}
            {/*    <ChatAttachPanel*/}
            {/*        title="Выберите паттерн"*/}
            {/*        onClose={ e => {*/}
            {/*            dropAttachPanel()*/}
            {/*        }}*/}
            {/*    >*/}

            {/*        {action === 'actions' &&*/}
            {/*            <ChatActionButtons setAction={action => setAction(action)}/>*/}
            {/*        }*/}
            {/*        {action === 'offer services' &&*/}
            {/*            <ChatServicePanel*/}
            {/*                onSubmit={services => onChoiceRequest(services)}*/}
            {/*            />*/}
            {/*        }*/}
            {/*    </ChatAttachPanel>*/}
            {/*}*/}

            {/* Menu */}
        </>
    );
}