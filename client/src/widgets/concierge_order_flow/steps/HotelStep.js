import React, {useEffect, useMemo, useState} from 'react';

import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";

import _SelectCity from "../_select_city/_SelectCity";

export default function HotelStep({
                                      data={},
                                      upsertFields=f=>f,

                                      next=f=>f,
                                      back=f=>f,

                                      submit=f=>f,
                                      close=f=>f
                                  }){

    const {  } = data;


    const [selectOption, setSelectOption] = useState(null)

    const handleOnSelect = (e) => {
        setSelectOption(e.value)
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        console.log(selectOption)
    }, [selectOption])

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (<>
        <Block isAlignCenter={true} bottom={40}>
            <Typography size={20} weight={700} align={'center'}>Данные по отелю</Typography>
        </Block>

        <_SelectCity selectOption={selectOption} handleOnSelect={handleOnSelect}/>

        <GroupInput>
            <MyInput placeHolder='Дата заезда' type='date' name='start_date' data={data} upsertFields={upsertFields} />
            <MyInput placeHolder='Дата выезда' type='date' name='end_date' data={data} upsertFields={upsertFields} />
        </GroupInput>
        <MyInput placeHolder='1 Номер для' type='number' name='number_of_adults' data={data} upsertFields={upsertFields} />
        <MyInput placeHolder='Дети' type='number' name='number_of_children' data={data} upsertFields={upsertFields} />

    </>);
}