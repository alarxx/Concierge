import React from 'react';

/**
 * for_id может быть случайно рандомным значением, он нужен для клика
 * */
export default function Checkbox({ label, for_id }){
    return (
        <div className="conditions__item">
            <input type="checkbox" className="custom-checkbox" id={for_id}/>
            <label htmlFor={for_id}>{label}</label>
        </div>
    );
}