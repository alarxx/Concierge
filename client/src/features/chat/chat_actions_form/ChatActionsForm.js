import React, {useMemo, useRef, useState} from "react";

import Typography from "../../../shared/ui/typography/Typography";
import GroupButtons from "../../../shared/ui/group_buttons/GroupButtons";
import Button from "../../../shared/ui/button/Button";
import Block from "../../../shared/ui/block/Block";
import HouseIcon from "../../../assets/icons/house.svg";
import PersonalCardIcon from "../../../assets/icons/personalcard.svg";
import GalleryIcon from "../../../assets/icons/gallery.svg";
import ArchiveIcon from "../../../assets/icons/direct-normal.svg";
import {useAppContext} from "../../../context/AppContext";
import Logger from "../../../internal/Logger";
import Modal from "../../../shared/ui/modal/Modal";

export default function ChatActionsForm({ conversation, cancelClick=f=>f }) {
    const logger = useMemo(()=>new Logger('ChatActionsForm'), []);

    const { chatHandler } = useAppContext();
    const { sendMessage } = chatHandler;

    function onOfferServices(e){
        logger.log('onOfferServices');
    }
    function onFileRequest(e){
        logger.log('onFileRequest');
        // sendMessage({
        //     conversation: conversation.id,
        //     type: 'file',
        // })
    }
    function onSendFile(e){
        logger.log('onSendFile');
    }




    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)
        // Handle the selected files
    };
    function onImageSend(e){
        fileInputRef.current.click();
        logger.log('onImageSend');
    }

    function onFileSubmit() {
        if (selectedFile && conversation) {
            sendMessage({
                conversation: conversation.id,
                type: 'image',
                image: selectedFile,
            })
            logger.log('Image sent', selectedFile);
        }
    }




    function onSendToArchive(e){
        logger.log('onSendToArchive');
    }

    return(<>
        <Modal minWidth={360} maxWidth={400} onClose={cancelClick}>
            {!selectedFile &&
            <Block isAlignCenter={true}>
                <Typography weight={700} size={24}>Что вы хотите сделать?</Typography>
            </Block>}

            <GroupButtons top={20}>
                {!selectedFile &&
                    <>
                        <Button onClick={onOfferServices}>
                            <HouseIcon viewBox="0 0 24 24"/>
                            Предложить услуги
                        </Button>

                        <Button onClick={onFileRequest}>
                            <PersonalCardIcon viewBox="0 0 24 24"/>
                            Получить файлы
                        </Button>

                        <Button onClick={onSendFile}>
                            <PersonalCardIcon viewBox="0 0 24 24"/>
                            Отправить файлы
                        </Button>

                        <Button onClick={onImageSend}>
                            <input type={'file'} accept={'.png,.jpg,.jpeg'} name={'image'} onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                            <GalleryIcon viewBox="0 0 24 24"/>
                            Отправить изображение
                        </Button>

                        {/*<Button onClick={e => setAction('change data')}>
                            <HouseIcon viewBox="0 0 24 24"/>
                            Изменить данные
                        </Button>*/}

                        <Button onClick={onSendToArchive}>
                            <ArchiveIcon viewBox="0 0 24 24"/>
                            Отправить в архив
                        </Button>
                    </>
                }

                {selectedFile && <Button onClick={onFileSubmit}>Отправить</Button>}

                <Button variant={'cancel'} onClick={cancelClick}>Отмена</Button>

            </GroupButtons>
        </Modal>
    </>)
}