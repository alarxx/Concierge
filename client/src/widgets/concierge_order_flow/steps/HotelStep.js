import React, {useEffect, useMemo, useState} from 'react';

import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";

import _SelectCity from "../_select_city/_SelectCity";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Logger from "../../../internal/Logger";

export default function HotelStep({
                                    data={},
                                    upsertFields=f=>f,

                                    next=f=>f,
                                    back=f=>f,

                                    submit=f=>f,
                                    close=f=>f,

                                    isFirstStep=false,
                                    isLastStep=false,
                                }){

    const logger = useMemo(()=>new Logger('HotelStep'), []);

    const {  } = data;

    const [selectOption, setSelectOption] = useState([]);

    const handleOnSelect = (e) => {
        setSelectOption(e.value);
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        logger.log(selectOption);
    }, [selectOption])

    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    function onSubmitHandler(e) {
        e.preventDefault();

        if (isLastStep) {
            return submit();
        }
        return next();
    }

    return (<>
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Данные по отелю</Typography>
                    </Block>

                    <_SelectCity selectOption={selectOption} handleOnSelect={handleOnSelect}/>

                    <GroupInput>
                        <MyInput placeHolder='Дата заезда' type='date' name='check_in_date' data={data} upsertFields={upsertFields} required={true} />
                        <MyInput placeHolder='Дата выезда' type='date' name='check_out_date' data={data} upsertFields={upsertFields} required={true} />
                    </GroupInput>
                    <MyInput placeHolder='1 Номер для' type='number' name='number_of_adults' data={data} upsertFields={upsertFields} required={true} />
                    <MyInput placeHolder='Дети' type='number' name='number_of_children' data={data} upsertFields={upsertFields} required={true} />
                </CardBody>

                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
            </Card>
        </form>
    </>);
}