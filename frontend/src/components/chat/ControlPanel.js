import React, {useState} from 'react'
import GalleryIcon from "../../icons/gallery.svg";
import SendIcon from "../../icons/send.svg";

export default function ControlPanel({
                                         choice=false,
                                         initInput="",
                                         onSend=console.log,
                                         onChoice=f=>f
}){
    const [input, setInput] = useState(initInput);

    function onChoiceInside(e){
        onChoice()
    }

    function send(e){
        onSend(input)
        setInput("")
    }

    return (
        <div className="chat__controlpanel">

            {choice &&
                <div className="chat-controls__btn" onClick={onChoiceInside}>
                    <div className="btn btn-main btn-active">
                        <span>Сделать выбор</span>
                    </div>
                </div>
            }

            {!choice &&
                <div className="chat-controls-panel">
                    <div className="chat-controls-panel__left attach">
                        <GalleryIcon />
                    </div>
                    <div className="chat-controls-panel__input">
                        <input
                            type="text"
                            className="chat__input"
                            placeholder="Введите сообщение"
                            value={input}
                            onChange={ e => setInput(e.target.value) }
                            onKeyDown={ e => {
                                if(e.key==='Enter')
                                    send(e)
                            }}
                        />
                    </div>
                    <div className="chat-controls-panel__right send" onClick={e => send(e)}>
                        <SendIcon />
                    </div>
                </div>
            }

        </div>
    );
}