import React from 'react'

import DocumentTextIcon from '../../icons/document-text.svg'
import DocumentDownload from '../../icons/document-download.svg'

export default function Document({ isLoaded }){
    return (
        <>
            {isLoaded &&
                <div className="chat-download">
                    <div className="chat-download__block"></div>
                    <div className="chat-download__file">
                        File.name
                    </div>
                    <div className="chat-download__btn">
                        <DocumentDownload />
                    </div>
                </div>
            }
            {!isLoaded &&
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
