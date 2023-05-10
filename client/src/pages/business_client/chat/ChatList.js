import React, { useEffect, useState } from 'react';

import NavbarPanel from '../../../widgets/navbar_panel/NavbarPanel';
import Box from '../../../shared/ui/box/Box'
import NavigationPanel from '../../../widgets/navigation_panel/NavigationPanel';
import Button from "../../../shared/ui/button/Button";
import Input from "../../../shared/ui/input/Input";
import ChatItemCard from "../../../widgets/chat/chat_item_card/ChatItemCard";
import {useNavigate} from "react-router-dom";
import Container from "../../../shared/ui/box/Container";

export default function ChatList({}){

    const navigate = useNavigate();

    return (
        <>
            <NavbarPanel title={'Чат'}/>
            <Box navbar={true} menu={true}>
                <Container>
                    <ChatItemCard onClick={e => navigate('/chat/single', {replace: false,})} />
                    <ChatItemCard onClick={e => navigate('/chat/single', {replace: false,})} />
                    <ChatItemCard onClick={e => navigate('/chat/single', {replace: false,})} />
                </Container>
            </Box>
            <NavigationPanel />
        </>
    )
}