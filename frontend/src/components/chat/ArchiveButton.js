import React from 'react'
import ArchiveIcon from '../../assets/icons/direct-normal.svg'

export default function ArchiveButton({ name="Перейти в архив", onClick=f=>f }){
    return (
        <div className="archive" onClick={onClick}>
            <div className="btn btn-second">
                <span>{name}</span>
                <ArchiveIcon />
            </div>
        </div>
    );
}