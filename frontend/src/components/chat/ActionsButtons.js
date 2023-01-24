import React, {useState} from 'react'

import HouseIcon from "../../assets/icons/house.svg";
import PersonalCardIcon from "../../assets/icons/personalcard.svg";
import ArchiveIcon from "../../assets/icons/direct-normal.svg";
import GalleryIcon from "../../assets/icons/gallery.svg"

function ActionButton({name, icon, archive, onClick}){
    return (
        <div className={`btn btn-main btn-icon ${archive?'btn-toarchive':'btn-attchinchat'}`} onClick={onClick}>
            <span>{name}</span>
            {icon}
        </div>
    )
}

export default function ActionButtons({ setAction=f=>f }){

    return (
        <div className="chat-controls-attach__actions">

            <ActionButton
                name={"Предложить услуги"}
                icon={<HouseIcon viewBox="0 0 24 24"/>}
                onClick={e => setAction('offer services')}
            />
            <ActionButton
                name={"Получить файлы"}
                icon={<PersonalCardIcon viewBox="0 0 24 24"/>}
                onClick={e => setAction('request files')}
            />
            <ActionButton
                name={"Отправить файлы"}
                icon={<GalleryIcon viewBox="0 0 24 24"/>}
                onClick={e => setAction('send file')}
            />
            <ActionButton
                name={"Изменить данные"}
                icon={<HouseIcon viewBox="0 0 24 24"/>}
                onClick={e => setAction('change data')}
            />
            <ActionButton
                archive
                name={"Отправить в архив"}
                icon={<ArchiveIcon viewBox="0 0 24 24"/>}
                onClick={e => setAction('archive')}
            />
        </div>
    );
}