import React from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

export default function Signin({}){
    return (
        <div className="">
            <form>
                <Input placeHolder='Город прибытия' type='text' field_key='from_city' />
                <Input placeHolder='Дата притела' type='text' field_key='from_city' />
                <Input placeHolder='Дата отлета' type='text' field_key='from_city' />
                <Button>Поиск трансфера</Button>
            </form>
        </div>
    );
}

