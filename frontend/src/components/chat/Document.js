import React from 'react'

import DocumentTextIcon from '../../assets/icons/document-text.svg'
import DocumentDownload from '../../assets/icons/document-download.svg'

/**
 * Как загружать и скачивать файлы без input??
 * */
export default function Document({ message, user, onClick }){

    const mymssg = user.id == message.sender;

    return (
        <div className={`${mymssg?'chat-message__wrapper':''}  ${mymssg?'mymssg':''}`}>

            {message.file &&
                <div className="chat-download">
                    <div className="chat-download__block"></div>
                    <div className="chat-download__file">
                        {message.filename ? message.filename : 'File.name'}
                    </div>
                    <div className="chat-download__btn">
                        <DocumentDownload />
                    </div>
                </div>
            }
            {!message.file &&
                <div className="chat-attach">
                    <div className="btn btn-main btn-withicon">
                        <input name="file" type="file" onInput={e => console.log(e)} onSubmit={e => console.log(e)}/>

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
