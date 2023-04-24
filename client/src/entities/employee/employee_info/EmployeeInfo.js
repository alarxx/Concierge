import React from 'react';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';

export default function EmployeeInfo({}){
    return (
        <div className="">
            <form>
                Детали
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

