import React from 'react'

import DocumentTextIcon from '../../icons/document-text.svg'

export default function DocAttach(){
    return (
        <div className="chat-attach">
            <div className="btn btn-main btn-withicon">
                <div className="btn__icon">
                    <DocumentTextIcon />
                </div>
                <span>Прикрепить файлы</span>
            </div>
        </div>
    );
}
