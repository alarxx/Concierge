import React from 'react';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';
import Typography from '../../../ui/typography/Typography';

export default function EmployeeInfo({}){
    return (
        <div className="">
            <form>
                <Typography size='18' weight='700' bottom='12'>Детали</Typography>
                <br/>
                Имя *
                <Input placeHolder='Город прибытия' type='text' field_key='from_city' />
                Фамилия *
                <Input placeHolder='Дата притела' type='text' field_key='from_city' />
                Отчество
                <Input placeHolder='Дата отлета' type='text' field_key='from_city' />
                Телефон *
                <Input placeHolder='Комната для' type='text' field_key='from_city' />
                Эл. почта *
                <Input placeHolder='Питание' type='text' field_key='from_city' />
            </form>
        </div>
    );
}

