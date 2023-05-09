import React, {useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import GroupInput from "../../../shared/ui/group_input/GroupInput";

import MyInput from './_MyInput'

export default function NewHotelOrder({ data={}, upsertFields=f=>f }){
    const navigate = useNavigate();

    return (
        <div className="">
            <form>
                <MyInput placeHolder='Город' type='text' name='city' data={data} upsertFields={upsertFields}/>
                <GroupInput>
                    <MyInput placeHolder='Дата прилета' type='date' name='arrival_date' data={data} upsertFields={upsertFields} />
                    <MyInput placeHolder='Дата отлета' type='date' name='departure_date' data={data} upsertFields={upsertFields} />
                </GroupInput>
                <MyInput placeHolder='1 Номер для' type='text' name='number_of_adults' data={data} upsertFields={upsertFields} />
                <MyInput placeHolder='Питание' type='text' name='meals' data={data} upsertFields={upsertFields} />
                {/*<MyInput placeHolder='Гражданство' type='text' name='citizenship' data={data} upsertFields={upsertFields} />*/}

                <Button onClick={e => navigate('/new/hotel', { replace: false, state: { data } })}>Поиск отеля</Button>
            </form>
        </div>
    );
}

