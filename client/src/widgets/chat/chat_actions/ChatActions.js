import React, {useMemo, useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import ChatActionsForm from "../../../features/chat/chat_actions_form/ChatActionsForm";
import MenuIcon from "../../../assets/icons/menu.svg";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import {useAppContext} from "../../../context/AppContext";
import Logger from "../../../internal/Logger";

export default function ChatActions({ conversation }) {
    const logger = useMemo(()=>new Logger('ChatActions'), []);

    const { chatHandler } = useAppContext();
    const { sendMessage } = chatHandler;

    const [isModalActive, setIsModalActive] = useState(false);

    return(<>
        {isModalActive && <Modal minWidth={360} maxWidth={400} onClose={e => setIsModalActive(false)}>
            <ChatActionsForm conversation={conversation} cancelClick={e => setIsModalActive(false)} />
        </Modal>}
        <ButtonIconic onClick={e=>setIsModalActive(true)}><MenuIcon /></ButtonIconic>
    </>)
}