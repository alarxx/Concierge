import React from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

import MyInput from './_MyInput'
import GroupInput from "../../../shared/ui/group_input/GroupInput";

export default function NewTransferOrder({ data={}, upsertFields=f=>f }){
    return (
        <div className="">
            <form>
                <MyInput placeHolder='Город прибытия' type='text' name='city' data={data} upsertFields={upsertFields} />
                <GroupInput>
                    <MyInput placeHolder='Дата прилета' type='date' name='arrival_date' data={data} upsertFields={upsertFields} />
                    <MyInput placeHolder='Дата отлета' type='date' name='departure_date' data={data} upsertFields={upsertFields} />
                </GroupInput>

                <MyInput placeHolder='Количество мест' type='number' name='number_of_adults' data={data} upsertFields={upsertFields} />

                <Button>Поиск билетов</Button>
            </form>
        </div>
    );
}

