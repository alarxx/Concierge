import React from 'react';

export default function InputForm({label, placeHolder="Введите значение"}){
    return (
        <div className="input-form">
            <label>{label}</label>
            <input type="text" className="input input-choice" placeholder={placeHolder} />
        </div>
    );
}