import NavbarPanel from "../../../widgets/navbar_panel/NavbarPanel";
import React, {useEffect, useMemo, useState} from "react";
import NavigationPanel from "../../../widgets/navigation_panel/NavigationPanel";
import Container from "../../../shared/ui/box/Container";
import Box from "../../../shared/ui/box/Box";
import Chat from "../../../widgets/chat/Chat";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Logger from "../../../internal/Logger";
import {useAppContext} from "../../../context/AppContext";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";
import AppBar from "../../../shared/ui/app_bar/AppBar";
import Block from "../../../shared/ui/block/Block";
import Logo from "../../../shared/ui/logo/Logo";
import Nav from "../../../shared/ui/nav/Nav";
import NavLink from "../../../shared/ui/nav/NavLink";

export const ChatPagePage = () => {
    const logger = useMemo(()=>new Logger('ChatPage'), []);

    const navigate = useNavigate();

    const { id: activeConversationId } = useParams(); // переименовываем id в activeConversationId
    function openConversation(conversation){
        // Мы должны проверить состоит ли пользователь в этом conversation
        navigate(`/chat/${conversation.id}`);
    }
    function closeConversation(){
        navigate('/chat ');
    }

    return (<>
        <Chat
            activeConversationId={activeConversationId}
            openConversation={openConversation}
            closeConversation={closeConversation}
        />

        {!activeConversationId && <NavigationPanel />}
    </>)
}
export default function ChatPage(){

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const { adaptiveHandler } = useAppContext();
    const { device } = adaptiveHandler;

    if (device === 'mobile' || device === 'tablet') {
        return (<>
            <NavbarPanel title={'Чат'}/>

            <Box navbar={true} menu={true}>
                <Container>
                    <ChatPagePage />
                </Container>
            </Box>

        </>)
    } else {
        return (<>
            <GroupInline width={'100%'} height={'100%'}>
                <AppBar left={true} isClientView={true}>
                    <Block>
                        <Logo/>
                        <Block top={80} isAlignCenter={true}>
                            <Nav block={true}>
                                <NavLink active={pathname.startsWith('/new')} text={'Главная'} onClick={e => navigate('/new', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/orders')} text={'Заказы'} onClick={e => navigate('/orders', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/chat')} text={'Чат'} onClick={e => navigate('/chat', {replace: true,})}/>
                                <NavLink active={pathname.startsWith('/profile')} text={'Сервисы'} onClick={e => navigate('/profile', {replace: true,})}/>
                            </Nav>
                        </Block>
                    </Block>
                </AppBar>
                <Container padding={'20px'}>
                    <ChatPagePage />
                </Container>
            </GroupInline>
        </>)
    }
};