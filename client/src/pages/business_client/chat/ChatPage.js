import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import React, {useEffect, useMemo, useState} from "react";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import Container from "../../../shared/ui/box/Container";
import Box from "../../../shared/ui/box/Box";
import Chat from "../../../widgets/chat/Chat";
import {useNavigate, useParams} from "react-router-dom";
import Logger from "../../../internal/Logger";
import {useAppContext} from "../../../context/AppContext";

export default function ChatPage(){
    const logger = useMemo(()=>new Logger('ChatPage'), []);

    const navigate = useNavigate();

    const { id: activeConversationId } = useParams(); // переименовываем id в activeConversationId

    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`);
    }

    function closeConversation(){
        navigate(-1);
    }

    return (<>
        <NavbarPanel title={'Чат'}/>

        <Box navbar={true} menu={true}>
            <Container>
                <Chat
                    activeConversationId={activeConversationId}
                    openConversation={openConversation}
                    closeConversation={closeConversation}
                />
            </Container>
        </Box>

        {!activeConversationId && <NavigationPanel />}
    </>);
};