import React, {useEffect} from 'react';

import Workflow from "../../phone/Workflow";
import Navbar from "../../phone/Navbar";
import Menu from "../../phone/Menu";
import Container from "../../phone/Container";
import NewButton from "../../phone/NewButton";
import Chats from "../../chat/Chats";
import ArchiveLink from "../../chat/ArchiveLink";
import ChatItem from "../../chat/ChatItem";

export default function Conversations({ conversations, openChat }){
    return (
        <Workflow>
            <Navbar title={"Мои заявки"}/>

            <Container>
                <NewButton name={"Новый запрос"}/>

                <Chats>
                    {conversations.map((conversation, i) => {
                        return <ChatItem
                            key={i}
                            {...conversation}
                            onClick={e => openChat(conversation)}
                        />
                    })}
                </Chats>

                <ArchiveLink />

            </Container>

            <Menu />
        </Workflow>
    );
}