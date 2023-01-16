import React from 'react';

/**
 * for_id может быть случайно рандомным значением, он нужен для клика
 * */
export default function Checkbox({ label, for_id, checked, onChange=f=>f}){
    return (
        // если поставить onClick на div, то дважды почему-то прокликивается(div+input)
        <div className="conditions__item">
            <input type="checkbox" className="custom-checkbox" id={for_id} checked={checked} onChange={onChange}/>
            <label htmlFor={for_id}>{label}</label>
        </div>
    );
}