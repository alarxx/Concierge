import React, {useState} from 'react'

import HouseIcon from "../../icons/house.svg";
import PersonalCardIcon from "../../icons/personalcard.svg";
import ArchiveIcon from "../../icons/direct-normal.svg";
import GalleryIcon from "../../icons/gallery.svg"

export default function ActionButtons(){

    return (
        <div className="chat-controls-attach__actions">
            <div className="btn btn-main btn-icon btn-attchinchat">
                <span>Предложить услугу</span>  
                <HouseIcon />
            </div>
            <div className="btn btn-main btn-icon btn-attchinchat">
                <span>Получить файлы</span>  
                <PersonalCardIcon />
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
    );
}