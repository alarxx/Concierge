import React, {useState} from 'react'

import styles from './chatInputForm.module.css'

import ChatActions from "../../../widgets/chat/chat_actions/ChatActions";
import Block from "../../../shared/ui/block/Block";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import SendIcon from "../../../assets/icons/send.svg";
export default function ChatInputForm({
                                       initInput="",
                                       onSend=console.log,
                                       onLeftClick=f=>f,
                                   }){

    const [input, setInput] = useState(initInput);

    function send( e ){
        if(!input) return;
        onSend(input)
        setInput("")
    }

    return (
        <GroupFlex>

            <ChatActions setAction={onLeftClick} />

            <Block left={15} right={15}>
                <input
                    type="text"
                    className={styles["chat__input"]}
                    placeholder="Введите сообщение"
                    value={input}
                    onChange={ e => setInput(e.target.value) }
                    onKeyDown={ e => {
                        if(e.key==='Enter')
                            send(e)
                    }}
                />
            </Block>

            <ButtonIconic onClick={send}><SendIcon /></ButtonIconic>

        </GroupFlex>
    );
}