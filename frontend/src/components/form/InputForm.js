import React from 'react';

export default function InputForm({
                                      label,
                                      placeHolder="Введите значение",
                                      updateFields=f=>f,
                                      value = "",
                                      field_key="",
                                      type="text",
                                      required=false
                                  }){

    // function check(value){}

    function setField(value){
        // check(value);
        const obj = {};
        obj[field_key] = value;
        updateFields(obj);
    }

    return (
        <div className="input-form">
            {label && <label>{label}</label>}
            <input
                type={type}
                required={required}
                className="input input-choice"
                placeholder={placeHolder}
                value={value}
                onChange={e => setField(e.target.value)}
            />
        </div>
    );
}