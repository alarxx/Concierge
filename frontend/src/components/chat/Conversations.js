import React, {useEffect} from 'react';

import {useNavigate} from "react-router-dom";

import Workflow from "../phone/Workflow";
import Navbar from "../phone/Navbar";
import Menu from "../phone/Menu";
import Container from "../phone/Container";
import ArchiveButton from "./ArchiveButton";
import Chats from "./Chats";
import YummyButton from "./YummyButton";
import ChatItem from "./ChatItem";
import CreateIcon from "../../assets/icons/arrow-right.svg"

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