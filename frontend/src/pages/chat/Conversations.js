import React, {useEffect} from 'react';

import {useNavigate} from "react-router-dom";

import Workflow from "../../components/phone/Workflow";
import Navbar from "../../components/phone/Navbar";
import Menu from "../../components/phone/Menu";
import Container from "../../components/phone/Container";
import ArchiveButton from "../../components/chat/ArchiveButton";
import Chats from "../../components/chat/Chats";
import YummyButton from "../../components/chat/YummyButton";
import ChatItem from "../../components/chat/ChatItem";
import CreateIcon from "../../icons/arrow-right.svg"

export default function Conversations({ conversations, openConversation }){
    const navigate = useNavigate();

    return (
        <Workflow>
            <Navbar title={"Мои заявки"}/>

            <Container>
                <ArchiveButton />
                <YummyButton name={"Заказать услугу"} icon={<CreateIcon/>} onClick={ e => navigate('/order')}/>

                <Chats>
                    {conversations.map((conversation, i) => {
                        return <ChatItem
                            key={i}
                            {...conversation}
                            onClick={e => openConversation(conversation)}
                        />
                    })}
                </Chats>


            </Container>

            <Menu />
        </Workflow>
    );
}