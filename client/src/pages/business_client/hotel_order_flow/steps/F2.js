import React, {useEffect, useState} from 'react';

import Input from '../../../shared/ui/input/Input';


export default function F1({ phone='', updateFields=f=>f, setErrors=f=>f }){

    return (
        <>
            {/*className={'title'}*/}
            <div>Информация о клиенте</div>

            <Input type={'text'} name='phone' value={phone} tip='Номер телефона клиента' placeholder='Введите номер' updateFields={updateFields} required={true}/>

        </>
    );
}
