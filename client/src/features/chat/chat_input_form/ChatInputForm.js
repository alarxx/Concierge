import React, {useState} from 'react'
import MenuIcon from "../../../assets/icons/menu.svg";
import SendIcon from "../../../assets/icons/send.svg";


import styles from './chatInputForm.module.css'
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
        <div className={styles["chat__controlpanel"]}>
            <div className={styles["chat-controls-panel"]}>
                <div className={`${styles["chat-controls-panel__left"]} ${styles['attach']}`} onClick={onLeftClick}>
                    <MenuIcon />
                </div>
                <div className={styles["chat-controls-panel__input"]}>
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
                </div>
                <div className={`${styles["chat-controls-panel__right"]} ${styles['send']}`} onClick={send}>
                    <SendIcon />
                </div>
            </div>

        </div>
    );
}