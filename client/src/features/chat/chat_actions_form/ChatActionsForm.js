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


    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
    };
    function onSendFile(e){
        fileInputRef.current.click();
        logger.log('onSendFile');
    }

    function onFileSubmit() {
        if (selectedFile && conversation) {
            const formData = new FormData();
            formData.append('conversation', conversation.id);
            formData.append('type', 'file');
            logger.log('FILE NAME', selectedFile)
            // selectedFile.name = encodeURIComponent(selectedFile.name);
            formData.append('file', selectedFile);

            fetch('/api/chat/message/send', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    logger.log('File response', response);
                    // Handle server response
                })
                .catch(error => {
                    // Handle upload error
                    logger.log('File error', error);
                });

            logger.log('File sent', selectedImage);
        }
        cancelClick()
        logger.log('FILE SENT', selectedFile);
    }




    const [previewUrl, setPreviewUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInputRef = useRef(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
    };
    function onImageSend(e){
        imageInputRef.current.click();
        logger.log('onImageSend');
    }

    function onImageSubmit() {
        if (selectedImage && conversation) {
            const formData = new FormData();
            formData.append('conversation', conversation.id);
            formData.append('type', 'image');
            formData.append('image', selectedImage);

            fetch('/api/chat/message/send', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    logger.log('Image response', response);
                    // Handle server response
                })
                .catch(error => {
                    // Handle upload error
                    logger.log('Image error', error);
                });

            logger.log('Image sent', selectedImage);
        }
        cancelClick()
    }




    function onSendToArchive(e){
        logger.log('onSendToArchive');
    }

    return(<>
        <Modal minWidth={360} maxWidth={400} onClose={cancelClick}>
            {!selectedImage &&
            <Block isAlignCenter={true}>
                <Typography weight={700} size={24}>Что вы хотите сделать?</Typography>
            </Block>}

            {(selectedImage && previewUrl) && (
                <div>
                    {selectedImage.type.startsWith('image/') ? (
                        <img src={previewUrl} alt="File Preview" style={{ maxWidth: '100%' }} />
                    ) : (
                        <a href={previewUrl} download={selectedImage.name}>Download {selectedImage.name}</a>
                    )}
                </div>
            )}

            <GroupButtons top={20}>
                {(!selectedImage && !selectedFile) &&
                    <>
                        {/*<Button onClick={onOfferServices}>*/}
                        {/*    <HouseIcon viewBox="0 0 24 24"/>*/}
                        {/*    Предложить услуги*/}
                        {/*</Button>*/}

                        {/*<Button onClick={onFileRequest}>*/}
                        {/*    <PersonalCardIcon viewBox="0 0 24 24"/>*/}
                        {/*    Получить файлы*/}
                        {/*</Button>*/}

                        <Button onClick={onSendFile}>
                            <input type={'file'} accept={'.pdf,.doc,.docx,.ppt,.pptx'} name={'image'} onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                            <PersonalCardIcon viewBox="0 0 24 24"/>
                            Отправить файлы
                        </Button>

                        <Button onClick={onImageSend}>
                            <input type={'file'} accept={'.png,.jpg,.jpeg'} name={'image'} onChange={handleImageChange} ref={imageInputRef} style={{ display: 'none' }} />
                            <GalleryIcon viewBox="0 0 24 24"/>
                            Отправить изображение
                        </Button>

                        {/*<Button onClick={e => setAction('change data')}>
                            <HouseIcon viewBox="0 0 24 24"/>
                            Изменить данные
                        </Button>*/}

                        {/*<Button onClick={onSendToArchive}>*/}
                        {/*    <ArchiveIcon viewBox="0 0 24 24"/>*/}
                        {/*    Отправить в архив*/}
                        {/*</Button>*/}
                    </>
                }

                {selectedImage && <Button onClick={onImageSubmit}>Отправить</Button>}
                {selectedFile && <Button onClick={onFileSubmit}>Отправить</Button>}

                <Button variant={'cancel'} onClick={cancelClick}>Отмена</Button>

            </GroupButtons>
        </Modal>
    </>)
}