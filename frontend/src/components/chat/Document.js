import React from 'react'

import DocumentTextIcon from '../../assets/icons/document-text.svg'
import DocumentDownload from '../../assets/icons/document-download.svg'

/** Можно использовать пакет file-saver */
function downloadFile({file}){
    fetch(`/file/${file.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/octet-stream',
            // 'Content-Disposition': 'attachment; filename=fileName.ext'
        },
    })
        .then(res => res.blob())
        .then(blob => {
            console.log(blob);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
        }).catch(console.log);
}

/**
 * Как загружать и скачивать файлы без input??
 * */
export default function Document({ message, user, onFileLoad = (m, f) => f }){

    const mymssg = user.id == message.sender;

    return (
        <div className={`${mymssg?'chat-message__wrapper':''}  ${mymssg?'mymssg':''}`}>

            {message.file &&
                <div className="chat-download"
                     onClick={e => {
                         downloadFile({file: message.file})
                     }}
                >
                    <div className="chat-download__block"></div>
                    <div className="chat-download__file">
                        {message.file.name ? message.file.name : 'File.name'}
                    </div>
                    <div className="chat-download__btn">
                        <DocumentDownload />
                    </div>
                </div>
            }
            {!message.file &&
                <div className="chat-attach">
                    <div className="btn btn-main btn-withicon">
                        {message.sender != user.id && <input name="file" type="file" onChange={e => {
                            e.preventDefault();
                            onFileLoad(message, e.target.files[0]);
                        }}/>}

                        <div className="btn__icon">
                            <DocumentTextIcon />
                        </div>
                        <span>Прикрепить файлы</span>
                    </div>
                </div>
            }
        </div>

    );
}
