import React, {useState} from "react";
import Button from "../../../shared/ui/button/Button";
import Modal from "../../../shared/ui/modal/Modal";
import ChatActionsForm from "../../../features/chat/chat_actions_form/ChatActionsForm";
import MenuIcon from "../../../assets/icons/menu.svg";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";

export default function ChatActions({setAction=f=>f}) {

    const [isModalActive, setIsModalActive] = useState(false);
    function onClick() {
        setIsModalActive(true)
    }

    return(<>
        {isModalActive && <Modal minWidth={360} maxWidth={400} onClose={e => setIsModalActive(false)}>
            <ChatActionsForm setAction={action => setAction(action)} cancelClick={e => setIsModalActive(false)} />
        </Modal>}
        <ButtonIconic onClick={onClick}><MenuIcon /></ButtonIconic>
    </>)
}