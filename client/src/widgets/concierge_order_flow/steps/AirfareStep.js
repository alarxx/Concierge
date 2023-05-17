import React, {useEffect, useMemo, useState} from 'react';
import Block from "../../../shared/ui/block/Block";
import Typography from "../../../shared/ui/typography/Typography";
import _NavigationButtons from "../_navigation_buttons/_NavigationButtons";
import CardBody from "../../../shared/ui/card/CardBody";
import Card from "../../../shared/ui/card/Card";
import Checkbox from "../../../shared/ui/checkbox/Checkbox";
import _SelectCity from "../_select_city/_SelectCity";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import MyInput from "../../../entities/order/new/_MyInput";
import Logger from "../../../internal/Logger";

export default function AirfareStep({
                                        data={},
                                        upsertFields=f=>f,

                                        next=f=>f,
                                        back=f=>f,

                                        submit=f=>f,
                                        close=f=>f,

                                        isFirstStep=false,
                                        isLastStep=false,
                                    }){

    const logger = useMemo(()=>new Logger('AirfareStep'), [])

    const {  } = data;

    function onSubmitHandler(e) {
        e.preventDefault();

        if (isLastStep) {
            return submit()
        }
        return next();
    }

    /*return (<>
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>
                    <Block isAlignCenter={true} bottom={20}>
                        <Typography size={20} weight={700} align={'center'}>Данные по билетам</Typography>
                    </Block>
                </CardBody>

                <Checkbox required={true} onChange={f=>f} label={'For text'}/>

                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
            </Card>
        </form>
    </>);*/
    const [selectOption1, setSelectOption1] = useState([]);
    const [selectOption2, setSelectOption2] = useState(data.city);

    const handleOnSelect1 = (e) => {
        setSelectOption1(e.value);
    }
    const handleOnSelect2 = (e) => {
        setSelectOption2(e.value);
    }

    useEffect(()=>{
        upsertFields({departure_place: selectOption1});
    }, [selectOption1])

    useEffect(()=>{
        logger.log({selectOption2});
        upsertFields({city: selectOption2});
    }, [selectOption2])

    return (<>
        <form onSubmit={onSubmitHandler}>
            <Card>
                <CardBody>

                    <Block isAlignCenter={true} bottom={40}>
                        <Typography size={20} weight={700} align={'center'}>Данные по билетам</Typography>
                    </Block>

                    <label>Дата</label>
                    <GroupInput>
                        <MyInput placeHolder='Дата' type='date' name='date_start' data={data} upsertFields={upsertFields} required={true} />
                    </GroupInput>

                    <label>Город вылета</label>
                    <_SelectCity selectOption={selectOption1} handleOnSelect={handleOnSelect1}/>
                    <label>Город прибытия</label>
                    <_SelectCity selectOption={selectOption2} handleOnSelect={handleOnSelect2}/>

                </CardBody>

                <_NavigationButtons isLastStep={isLastStep} isFirstStep={isFirstStep} back={back}/>
            </Card>
        </form>
    </>);
}