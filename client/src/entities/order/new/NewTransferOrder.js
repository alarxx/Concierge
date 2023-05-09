import React from 'react';
import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';

import MyInput from './_MyInput'

export default function NewTransferOrder({ data={}, upsertFields=f=>f }){
    return (
        <div className="">
            <form>
                <MyInput placeHolder='Город прибытия' type='text' name='city' data={data} upsertFields={upsertFields} />
                <MyInput placeHolder='Дата прибытия' type='text' name='from_city' data={data} upsertFields={upsertFields} />
                <MyInput placeHolder='Дата отлета' type='text' name='from_city' data={data} upsertFields={upsertFields} />
                <Button>Поиск трансфера</Button>
            </form>
        </div>
    );
}

