import React, {useState} from 'react'
import MenuIcon from "../../icons/menu.svg";
import SendIcon from "../../icons/send.svg";
import AttachPanel from "../../components/chat/AttachPanel";

export default function InputPanel({
                                         initInput="",
                                         onSend=console.log,
                                     }){

    const [input, setInput] = useState(initInput);

    function send( e ){
        onSend(input)
        setInput("")
    }

    return (
        <div className="chat__controlpanel">

            <div className="chat-controls-panel">
                <div className="chat-controls-panel__left attach">
                    <MenuIcon />
                </div>
                <div className="chat-controls-panel__input">
                    <textarea
                        type="text"
                        className="chat__input"
                        placeholder="Введите сообщение"
                        rows="1"
                        value={input}
                        onChange={ e => setInput(e.target.value) }
                        onKeyDown={ e => {
                            if(e.key==='Enter')
                                send(e)
                        }}
                    ></textarea>
                </div>
                <div className="chat-controls-panel__right send" onClick={send}>
                    <SendIcon />
                </div>
            </div>

        </div>
    );
}