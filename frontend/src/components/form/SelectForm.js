import React from 'react';

import ArrowSquareDown from '../../assets/icons/arrow-square-down.svg';

export default function SelectForm({label}){
    return (
        <div className="select-form">
            <label>{label}</label>
            <div className="select">
                <div className="select__label">Выбрать</div>
                <div className="select__icon">
                    <ArrowSquareDown width={24} height={24}/>
                </div>
            </div>
        </div>
    );
}