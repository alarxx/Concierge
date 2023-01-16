import React from 'react'
import GalleryIcon from "../../icons/gallery.svg";
import SendIcon from "../../icons/send.svg";

export default function ControlPanel({  }){
    return (
        <div className="chat__controlpanel">
            {/*<div class="chat-controls__btn">
                    <div class="btn btn-main btn-unactive">
                        <span>Сделать выбор</span>
                    </div>
                </div>*/}
            <div className="chat-controls-panel">
                <div className="chat-controls-panel__left attach">
                    <GalleryIcon />
                </div>
                <div className="chat-controls-panel__input">
                    <input type="text" className="chat__input" placeholder="Введите сообщение"/>
                </div>
                <div className="chat-controls-panel__right send">
                    <SendIcon />
                </div>
            </div>
        </div>
    );
}