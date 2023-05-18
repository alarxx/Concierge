import React from 'react'

import LoadIcon from '../../../assets/icons/document-text.svg'
import DownloadIcon from '../../../assets/icons/document-download.svg'
import Button from "../../../shared/ui/button/Button";

import styles from  './fileInChat.module.css'
import Message from "../message/Message";

/** Можно использовать пакет file-saver */
function downloadFile({file, file_name}){
    fetch(`/file/d/${file}`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/octet-stream',
            // 'Content-Disposition': 'attachment; filename=fileName.ext'
        },
    })
        .then(res => res.blob())
        .then(blob => {
            console.log(blob);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file_name;
            a.click();
        }).catch(console.log);
}

function onFileLoad(messageId, file){
    console.log(file);

    const formData = new FormData();
    formData.append('id', messageId)
    formData.append('file', file)

    fetch('/api/chat/message', {
        method: 'PUT',
        body: formData,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
/**
 * Как загружать и скачивать файлы без input??
 * */
export default function FileInChat({ message, user}){

    const {file, file_name} = message;

    return (<>
        <Message message={message} user={user}>

            {file &&
                <div className={styles["chat-download"]}
                     onClick={e => {
                         downloadFile({file, file_name})
                     }}
                >
                    <div className={styles["chat-download__block"]}></div>
                    <div className={styles["chat-download__file"]}>
                        {file_name ? file_name : 'File.name'}
                    </div>
                    <div className={styles["chat-download__btn"]}>
                        <DownloadIcon />
                    </div>
                </div>
            }
            {!file &&
                <div className={styles["chat-attach"]}>
                    <Button>
                        <input name="file" type="file" onChange={e => {
                            e.preventDefault();
                            onFileLoad(message.id, e.target.files[0]);
                        }}/>
                        <LoadIcon />
                        <span>Прикрепить файлы</span>
                    </Button>
                </div>
            }
        </Message>
    </>);
}