import React, {useEffect, useState} from 'react';

import Input from '../../../components/ui/Input';
import Section from '../../../components/ui/Section'


export default function F1({ clientName='', updateFields=f=>f, setErrors=f=>f }){

    return (
        <>
            <div className={'title'}>Информация о заказе</div>

            <Section title={"Заказ №"} text={"requestId"} />

            <Input type={'text'} name='clientName' value={clientName} tip='Имя клиента' placeholder='Введите имя' updateFields={updateFields} required={true}/>
            
        </>
    );
}
