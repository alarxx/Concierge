import React from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import GroupInput from "../../../shared/ui/group_input/GroupInput";

export default function Signin({}){
    return (
        <div className="">
            <form>
                <Input placeHolder='Город прибытия' type='text' name='from_city' />
                <GroupInput>
                    <Input placeHolder='Дата притела' type='date' name='from_city' />
                    <Input placeHolder='Дата отлета' type='date' name='from_city' />
                </GroupInput>
                <Input placeHolder='Комната для' type='text' name='from_city' />
                <Input placeHolder='Питание' type='text' name='from_city' />
                <Input placeHolder='Гражданство' type='text' name='from_city' />
                <Button>Поиск отеля</Button>
            </form>
        </div>
    );
}

