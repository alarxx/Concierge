import React from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import Typography from '../../../shared/ui/typography/Typography';

export default function EmployeeInfo({name='', phone='', email=''}){
    return (
        <div className="">
            <form>
                {/*<Typography size='18' weight='700' bottom='12'>Контактные данные</Typography>*/}
                {/*<br/>*/}
                <label>Имя *</label>
                <Input value={name} placeHolder='Имя' type='text' field_key='from_city' />

                <label>Телефон *</label>
                <Input value={phone} placeHolder='Телефон' type='text' field_key='from_city' />

                <label>Эл. почта *</label>
                <Input value={email} placeHolder='Эл. почта' type='text' field_key='from_city' />
            </form>
        </div>
    );
}

