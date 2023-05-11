import React from 'react'

import HouseIcon from "../../../assets/icons/house.svg";
import PersonalCardIcon from "../../../assets/icons/personalcard.svg";
import ArchiveIcon from "../../../assets/icons/direct-normal.svg";
import GalleryIcon from "../../../assets/icons/gallery.svg"
import Button from "../../../shared/ui/button/Button";

export default function ChatActionButtons({ setAction=f=>f }){

    return (
        <div className="chat-controls-attach__actions">

            <Button onClick={e => setAction('offer services')}>
                <HouseIcon viewBox="0 0 24 24"/>
                Предложить услуги
            </Button>

            <Button onClick={e => setAction('request files')}>
                <PersonalCardIcon viewBox="0 0 24 24"/>
                Получить файлы
            </Button>

            <Button onClick={e => setAction('send file')}>
                <GalleryIcon viewBox="0 0 24 24"/>
                Отправить файлы
            </Button>

            <Button onClick={e => setAction('change data')}>
                <HouseIcon viewBox="0 0 24 24"/>
                Изменить данные
            </Button>

            <Button onClick={e => setAction('archive')}>
                <ArchiveIcon viewBox="0 0 24 24"/>
                Отправить в архив
            </Button>

        </div>
    );
}