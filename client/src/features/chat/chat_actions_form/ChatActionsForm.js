import React from "react";

import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import HouseIcon from "../../../assets/icons/house.svg";
import PersonalCardIcon from "../../../assets/icons/personalcard.svg";
import GalleryIcon from "../../../assets/icons/gallery.svg";
import ArchiveIcon from "../../../assets/icons/direct-normal.svg";

export default function ChatActionsForm({setAction =f=>f, cancelClick=f=>f}) {

    return(<>
        <Block isAlignCenter={true}>
            <Typography weight={700} size={24} bottom={12}>Что вы хотите сделать?</Typography>
        </Block>

        <GroupButtons top={20}>

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


            <Button variant={'cancel'} onClick={cancelClick}>Отмена</Button>

        </GroupButtons>
    </>)
}