import React from 'react';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';

export default function Signin({}){
    return (
        <div className="">
            <form>
                <Input placeHolder='Город прибытия' type='text' field_key='from_city' />
                <Input placeHolder='Дата притела' type='text' field_key='from_city' />
                <Input placeHolder='Дата отлета' type='text' field_key='from_city' />
                <Input placeHolder='Комната для' type='text' field_key='from_city' />
                <Input placeHolder='Питание' type='text' field_key='from_city' />
                <Input placeHolder='Гражданство' type='text' field_key='from_city' />
                <Button>Поиск отеля</Button>
            </form>
        </div>
    );
}

