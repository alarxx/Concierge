import React from 'react';
import Input from '../../../ui/input/Input';
import Button from '../../../ui/button/Button';

export default function Signin({}){
    return (
        <div className="">
            <form>
                <Input placeHolder='Эл. почта' type='email' field_key='email' />
                <Input placeHolder='Пароль' type='password' field_key='password' />
                <Button>Вход</Button>
            </form>
        </div>
    );
}

