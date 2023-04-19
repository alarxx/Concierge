import React from 'react';

export default function Input({
                                  placeholder="Введите данные",
                                  name="_",
                                  type="text",
                                  value="",
                                  updateFields=f=>f,
                                  // Что за tip?
                                  tip="",
                                  required=false
}){

    return (
        <div>{ /*className='input-form'*/}

            {/*className='inputLabel'*/}
            <div>{tip}</div>

            {/*className="input"*/}
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={e=>updateFields({[name]: e.target.value})} required={required} />

        </div>
    );
}

