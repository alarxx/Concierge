import React from 'react'

import DirectNormal from '../../icons/direct-normal.svg'

export default function ArchiveLink(){
    return (
        <div className="archive link">

            <div className="link__text">
                Архив
            </div>

            <div className="link__icon">
                <DirectNormal viewBox="0 0 24 24"/>
            </div>

        </div>
    );
}