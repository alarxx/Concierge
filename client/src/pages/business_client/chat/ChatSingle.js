import React, { useEffect, useState } from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import ChatItem from "../../../widgets/chat/chat_item/ChatItem";
import ChatInputForm from "../../../features/chat/chat_input_form/ChatInputForm";
import DayInChat from "../../../features/chat/day_in_chat/DayInChat";
import ChatMessage from "../../../features/chat/chat_message/ChatMessage";

export default function ChatSingle({}){

    return (
        <>
            <NavbarPanel title={'Чат Single'}/>
            <Box>
                <DayInChat date={new Date().getDate()}/>
                <ChatMessage message={'Информация о вашем заказе всегда доступна в информационной кнопке в шапке чата и на странице ваших заказов'}/>
                <ChatMessage message={'Меня зовут Аксауле. Я  ваш менеджер-консультант. Я помогу вам разобраться во всем и с легкостью составлю вам бронь'}/>
                <ChatMessage message={'Есть ли у вас дополнительные пожелания или вопросы? '}/>
            </Box>
            <ChatInputForm />
            {/*<NavigationPanel />*/}
        </>
    )
}