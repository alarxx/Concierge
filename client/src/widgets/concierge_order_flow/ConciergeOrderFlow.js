import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import useMultistep from "../../hooks/useMultistep";

import Logger from "../../internal/Logger";
import NeedsStep from "./steps/NeedsStep";
import HotelStep from "./steps/HotelStep";
import AirfareStep from "./steps/AirfareStep";
import TransferStep from "./steps/TransferStep";
import CardBody from "../../shared/ui/card/CardBody";
import NewHotelOrder from "../../entities/order/new/NewHotelOrder";
import NewTicketsOrder from "../../entities/order/new/NewTicketsOrder";
import Modal from "../../shared/ui/modal/Modal";
import ComingSoon from "../../features/order/coming_soon/ComingSoon";
import NewTransferOrder from "../../entities/order/new/NewTransferOrder";
import Card from "../../shared/ui/card/Card";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Block from "../../shared/ui/block/Block";
import ButtonIconic from "../../shared/ui/button_iconic/ButtonIconic";
import Typography from "../../shared/ui/typography/Typography";
import Button from "../../shared/ui/button/Button";

import ArrowLeft from '../../assets/icons/backbtn_icon.svg'

export default function ConciergeOrderFlow() {

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(() => new Logger('ConciergeOrderFlow'), []);

    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({});

    /* В зависимости от того, что входит в needs добавляем в массив компоненты */
    const [Steps, setSteps] = useState([NeedsStep,HotelStep]);

    /*useEffect(()=>{
        setSteps(()=>{
            const steps = [NeedsStep];
            if(data.needs['hotel']){
                steps.push(HotelStep);
            }
            if(data.needs['airfare']){
                steps.push(AirfareStep);
            }
            if(data.needs['transfer']){
                steps.push(TransferStep);
            }
            return steps;
        });
    }, [data])*/


    /**
     * upsertFields(fields) создает копию прошлого объекта data и добавляет новые поля из объекта fields.
     * То есть новый объект - это копия старого объекта с новыми полями, которые мы передадим в аргументах upsertFields(fields}).
     *
     * Example:
     * // Now data = { cat: 'meow' };
     *
     * upsertFields({ dog: 'woof' });
     * // Now data = { cat: 'meow', dog: 'woof' }
     *
     * upsertFields({ cat: 'not meow' });
     * // Now data = { cat: 'not meow', dog: 'woof' }
     * */
    function upsertFields(fields){
        setData(prev => ({...prev, ...fields}));
    }

    const {Step, back, next, isFirstStep, isLastStep} = useMultistep(Steps);


    async function submit(){}

    async function close(){}

    useEffect(()=>{
        console.log('DATA', data)
    }, [data])

    return (<>
        {<Step
            data={data}
            upsertFields={upsertFields}

            next={next}
            back={back}

            submit={submit}
            close={close}

            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
        />}
    </>);
}