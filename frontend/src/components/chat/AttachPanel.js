import React, {useState} from 'react'

import CloseIcon from "../../icons/close.svg";
import HouseIcon from "../../icons/house.svg";
import PersonalcardIcon from "../../icons/personalcard.svg";
import ArchiveIcon from "../../icons/direct-normal.svg";

export default function AttachPanel(){

    return (
        <div className="chat-controls-attach">
            <div className="chat-controls-attach__close">
                <CloseIcon />
            </div>
            <div className="chat-controls-attach__title">
                Выберите паттерн 
            </div>
            <div className="chat-controls-attach__actions">
                <div className="btn btn-main btn-icon btn-attchinchat">
                    <span>Предложить услугу</span>  
                    <HouseIcon />
                </div>
                <div className="btn btn-main btn-icon btn-attchinchat">
                    <span>Получить файлы</span>  
                    <PersonalcardIcon />
                </div>
                <div className="btn btn-main btn-icon btn-attchinchat">
                    <span>Отправить файл</span>  
                    <GalleryIcon />
                </div>
                <div className="btn btn-main btn-icon btn-attchinchat">
                    <span>Изменить данные</span>  
                    <HouseIcon />
                </div>
                <div className="btn btn-main btn-icon btn-toarchive">
                    <span>Отправить в архив</span>  
                    <ArchiveIcon />
                </div>
            </div>
        </div>
    );
}