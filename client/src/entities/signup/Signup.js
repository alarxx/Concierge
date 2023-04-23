import React from 'react';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';

export default function Signup({}){
    return (
        <div className="">
            <form>
                <Input placeHolder='Эл. почта' type='email' field_key='email' />
                <Button>Получить доступ</Button>
            </form>
        </div>
    );
}

