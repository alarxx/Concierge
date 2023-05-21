import React, {useState} from 'react'

import styles from './chatInputForm.module.css'

import ChatActions from "../../../widgets/chat/chat_actions/ChatActions";
import Block from "../../../shared/ui/block/Block";
import GroupFlex from "../../../shared/ui/group_flex/GroupFlex";
import ButtonIconic from "../../../shared/ui/button_iconic/ButtonIconic";
import SendIcon from "../../../assets/icons/send.svg";
import {useAppContext} from "../../../context/AppContext";
export default function ChatInputForm({
                                          conversation,
                                          initInput="",
                                          bottomref
                                      }){

    const { chatHandler } = useAppContext();
    const { sendMessage } = chatHandler;

    const [inputText, setInputText] = useState(initInput);

    function onTextSend(){
        if(!inputText) {
            return;
        }
        sendMessage({
            conversation: conversation.id,
            type: 'text',
            text: inputText,
        });
        setInputText("");

        // bottomref?.current?.scrollIntoView({behavior: 'smooth'});
        // console.log("BOTTOM REF", bottomref.current)
    }

    return (<>
        <GroupFlex>

            <ChatActions conversation={conversation} />

            <Block left={15} right={15}>
                <input
                    type="text"
                    className={styles["chat__input"]}
                    placeholder="Введите сообщение"
                    value={inputText}
                    onChange={ e => setInputText(e.target.value) }
                    onKeyDown={ e => {
                        if(e.key==='Enter'){
                            onTextSend()
                        }
                    }}
                    autoFocus={true}
                />
            </Block>

            <ButtonIconic onClick={e=>onTextSend()}><SendIcon /></ButtonIconic>

        </GroupFlex>
    </>);
}