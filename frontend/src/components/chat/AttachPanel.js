import React, {useState} from 'react'

import CloseIcon from "../../icons/close.svg";
<<<<<<< HEAD
import HouseIcon from "../../icons/house.svg";
import PersonalCardIcon from "../../icons/personalcard.svg";
import ArchiveIcon from "../../icons/direct-normal.svg";
import GalleryIcon from '../../icons/gallery.svg'
=======
>>>>>>> 296f7332006a3c3307da3312fa1ad9db2deb4d72

export default function AttachPanel({title, children}){

    return (
        <div className="chat__controlpanel">
            <div className="chat-controls-attach">
                <div className="chat-controls-attach__close">
                    <CloseIcon />
                </div>
                <div className="chat-controls-attach__title">
<<<<<<< HEAD
                    Выберите паттерн
                </div>
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
=======
                    {title} 
>>>>>>> 296f7332006a3c3307da3312fa1ad9db2deb4d72
                </div>
                {children}
            </div>
        </div>
    );
}