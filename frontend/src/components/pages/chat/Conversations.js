import React, {useEffect} from 'react';

import Workflow from "../../phone/Workflow";
import Navbar from "../../phone/Navbar";
import Menu from "../../phone/Menu";
import Container from "../../phone/Container";
import ArchiveButton from "../../chat/ArchiveButton";
import Chats from "../../chat/Chats";
import YummyButton from "../../chat/YummyButton";
import ChatItem from "../../chat/ChatItem";
import CreateIcon from "../../../icons/arrow-right.svg"

export default function Conversations({ conversations, openChat }){
    return (
        <Workflow>
            <Navbar title={"Мои заявки"}/>

            <Container>
                <ArchiveButton />
                <YummyButton name={"Заказать услугу"} icon={<CreateIcon/>} />

                <Chats>
                    {conversations.map((conversation, i) => {
                        return <ChatItem
                            key={i}
                            {...conversation}
                            onClick={e => openChat(conversation)}
                        />
                    })}
                </Chats>


            </Container>

            <Menu />
        </Workflow>
    );
}