import React from 'react';

export default function InputForm({
                                      label,
                                      placeHolder="Введите значение",
                                      updateFields=f=>f,
                                      value = "",
                                      field_key="",
                                      type="string"
}){

    function check(value, type){
        if (typeof value === type){
            return true
        }
        else {
            return false
        }
    }

    function setField(value){
        if ( false && !check(value, type) ){
            return
        }
        const obj = {};
        obj[field_key] = value;
        updateFields(obj);
    }

    return (
        <div className="input-form">
            <label>{label}</label>
            <input
                type="text"
                required
                className="input input-choice"
                placeholder={placeHolder}
                value={value}
                onChange={e => setField(e.target.value)}
            />
        </div>
    );
}