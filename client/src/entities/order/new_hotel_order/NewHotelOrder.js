import React, {useState} from 'react';

import {useNavigate} from "react-router-dom";

import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import GroupInput from "../../../shared/ui/group_input/GroupInput";

function MyInput({
                     placeHolder="Введите значение",
                     name="_",
                     type="text",
                     required=false,
                     data={}, upsertFields=f=>f,
                 }){
    return (
        <Input
            name={name}
            placeholder={placeHolder}
            type={type}
            value={data[name]}
            onChange={e=>upsertFields({[name]: e.target.value})}
            required={required}
        />
    );
}

export default function NewHotelOrder({}){
    const navigate = useNavigate();

    const [data, setData] = useState({});

    function upsertFields(fields){
        setData(prev => ({...prev, ...fields}));
    }

    return (
        <div className="">
            <form>
                <MyInput placeHolder='Город прибытия' type='text' name='arrival_city' data={data} upsertFields={upsertFields}/>
                <GroupInput>
                    <MyInput placeHolder='Дата прилета' type='date' name='arrival_date' data={data} upsertFields={upsertFields} />
                    <MyInput placeHolder='Дата отлета' type='date' name='departure_date' data={data} upsertFields={upsertFields} />
                </GroupInput>
                <MyInput placeHolder='1 Номер для' type='text' name='number_of_adults' data={data} upsertFields={upsertFields} />
                <MyInput placeHolder='Питание' type='text' name='meals' data={data} upsertFields={upsertFields} />
                <MyInput placeHolder='Гражданство' type='text' name='citizenship' data={data} upsertFields={upsertFields} />

                <Button onClick={e => navigate('/hotel', { replace: false, state: data })}>Поиск отеля</Button>
            </form>
        </div>
    );
}

