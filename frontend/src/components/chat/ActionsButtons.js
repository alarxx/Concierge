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
                <HouseIcon viewBox="0 0 24 24"/>
            </div>
            <div className="btn btn-main btn-icon btn-attchinchat">
                <span>Получить файлы</span>  
                <PersonalCardIcon viewBox="0 0 24 24"/>
            </div>
            <div className="btn btn-main btn-icon btn-attchinchat">
                <span>Отправить файл</span>  
                <GalleryIcon viewBox="0 0 24 24"/>
            </div>
            <div className="btn btn-main btn-icon btn-attchinchat">
                <span>Изменить данные</span>  
                <HouseIcon viewBox="0 0 24 24"/>
            </div>
            <div className="btn btn-main btn-icon btn-toarchive">
                <span>Отправить в архив</span>  
                <ArchiveIcon viewBox="0 0 24 24"/>
            </div>
        </div>
    );
}