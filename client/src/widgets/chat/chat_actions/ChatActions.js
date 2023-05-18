import React, {useMemo, useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import ChatActionsForm from "../../../features/chat/chat_actions_form/ChatActionsForm";
import MenuIcon from "../../../assets/icons/menu.svg";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import {useAppContext} from "../../../context/AppContext";
import Logger from "../../../internal/Logger";
import ConciergeServiceForm from "../../../features/order/concierge_service_form/ConciergeServiceForm";
import useToggle from "../../../hooks/useToggle";

export default function ChatActions({ conversation }) {
    const logger = useMemo(()=>new Logger('ChatActions'), []);

    const { chatHandler } = useAppContext();
    const { sendMessage } = chatHandler;

    const [isActive, toggle] = useToggle(false);

    return(<>
        { isActive &&  <ChatActionsForm conversation={conversation} cancelClick={toggle} /> }
        <ButtonIconic onClick={toggle}><MenuIcon /></ButtonIconic>
    </>)
}