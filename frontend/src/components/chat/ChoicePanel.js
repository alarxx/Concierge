import React, {useState} from 'react'
import GalleryIcon from "../../assets/icons/gallery.svg";
import SendIcon from "../../assets/icons/send.svg";

export default function ChoicePanel({
                                         onClick=f=>f
                                     }){

    return (
        <div className="chat__controlpanel">

                <div className="chat-controls__btn" onClick={onClick}>
                    <div className="btn btn-main btn-active">
                        <span>Сделать выбор</span>
                    </div>
                </div>


        </div>
    );
}