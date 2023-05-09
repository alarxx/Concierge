import React, { useEffect, useState } from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import ChatItem from "../../../widgets/chat/chat_item/ChatItem";
import {useNavigate} from "react-router-dom";

export default function ChatList({}){

    const navigate = useNavigate();

    return (
        <>
            <NavbarPanel title={'Чат'}/>
                <Box>
                    <ChatItem onClick={e => navigate('/chat/single', {replace: true,})} />
                    <ChatItem onClick={e => navigate('/chat/single', {replace: true,})} />
                    <ChatItem onClick={e => navigate('/chat/single', {replace: true,})} />
                </Box>
            <NavigationPanel />
        </>
    )
}