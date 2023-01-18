import React from 'react'

import DocumentTextIcon from '../../assets/icons/document-text.svg'
import DocumentDownload from '../../assets/icons/document-download.svg'

export default function Document({ message, onClick }){
    return (
        <>
            {message.isLoaded &&
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
            {!message.isLoaded &&
                <div className="chat-attach">
                    <div className="btn btn-main btn-withicon">
                        <div className="btn__icon">
                            <DocumentTextIcon />
                        </div>
                        <span>Прикрепить файлы</span>
                    </div>
                </div>
            }
        </>



    );
}
