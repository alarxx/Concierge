import React, {useEffect, useMemo, useState} from 'react';

import {useNavigate} from "react-router-dom";

import ChatItemCard from "./chat_item_card/ChatItemCard";
import Logger from "../../internal/Logger";
import {useAppContext} from "../../context/AppContext";

import getOrderInfo from "../../internal/order/getOrderInfo";

function truncateString(str) {
    // console.log("last message", str);
    if(!str) return str;
    if (str.length > 40) {
        return str.slice(0, 37) + "...";
    }
    return str;
}

export default function Conversations({
                                          openConversation=f=>f
                                      }){
    const logger = useMemo(()=>new Logger('Conversations'), []);

    const navigate = useNavigate();

    const {chatHandler, orderHandler} = useAppContext();
    const {conversations, notifications, messages} = chatHandler;
    const {orders} = orderHandler;


    /**
     * // Лучше было бы поддерживать extended в контексте.
     * 1) Беседы должны иметь последнее сообщение.
     * 2) Беседы должны быть отсортированы по дате последнего сообщения.
     * 3) Беседы должны иметь количество уведомлений.
     * */
    const [sorted_extended_conversations, set_sorted_extended_conversations] = useState([])

    useEffect(()=>{
        // Сначала нужно по отдельности каждую беседу обработать, потом отсортировать.
        const extended_conversations = conversations.map(conversation => {
            const _messages = messages.filter(message => message.conversation == conversation.id);

            // сначала новые
            const sorted_messages = _messages.sort((a, b) => {
                const bDate = new Date(b.createdAt);
                const aDate = new Date(a.createdAt);
                return bDate - aDate;
            } );

            const newest_message = sorted_messages[0];

            const _notifications = notifications.filter(notification => notification.conversation == conversation.id);
            const notifications_number = _notifications.length;

            const orderInfo = getOrderInfo(orders.find(_order => _order.conversation == conversation.id));

            return ({
                ...conversation,
                newest_message,
                notifications_number,
                customerName: orderInfo.customerName,
                ordersLast4IDDigits: orderInfo.last4IDDigits,
                description: orderInfo.name
            });
        });

        // сначала новые
        const _sorted_extended_conversations = extended_conversations.sort((a, b) => {
            // Если объекты не имеют newest_message, то мы считаем по дате создания беседы
            const bDate = new Date((b.newest_message || b).createdAt);
            const aDate = new Date((a.newest_message || a).createdAt);
            return bDate - aDate;
        });

        set_sorted_extended_conversations(_sorted_extended_conversations);

    }, [conversations, messages, notifications]) // нужно ли нам перерисовывать conversation, без изменения уведомлений? У нас всегда новое сообщение сопровождается уведомлением


    return (<>
        {sorted_extended_conversations.length === 0 && <p>Нет бесед</p>}
        {sorted_extended_conversations.map((extended_conversation, key) => {
            const {customerName, notifications_number, newest_message, ordersLast4IDDigits, description} = extended_conversation;

            const last_message = !newest_message ? '' : (newest_message.text ? truncateString(newest_message.text) : newest_message.type);

            return (<div key={key}>
                <ChatItemCard
                    customerName={customerName}
                    description={description}
                    ordersLast4IDDigits={ordersLast4IDDigits}
                    unread_num={notifications_number}
                    last_message={last_message}
                    onClick={e => openConversation(extended_conversation)}
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