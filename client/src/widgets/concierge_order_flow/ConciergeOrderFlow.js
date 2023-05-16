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
import Loading from "../../shared/loading/Loading";

export default function ConciergeOrderFlow() {

    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(() => new Logger('ConciergeOrderFlow'), []);

    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({number_of_adults: 1, number_of_children: 0});
    const [isLoading, setIsLoading] = useState(false);

    /* В зависимости от того, что входит в needs добавляем в массив компоненты */
    const [Steps, setSteps] = useState([NeedsStep]);

    useEffect(()=>{
        setSteps(()=>{
            const steps = [NeedsStep];
            if (data.needs) {
                if(data.needs.includes('hotel')){
                    steps.push(HotelStep);
                }
                if(data.needs.includes('airfare')){
                    steps.push(AirfareStep);
                }
                if(data.needs.includes('transfer')){
                    steps.push(TransferStep);
                }
            }
            return steps;
        });
    }, [data])


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


    async function submit(){
        // do something with data
        logger.log("submit:", data);
        setIsLoading(true);
        const meta = {
            needs: data.needs,
            city: data.city,
        }
        if(data.needs.includes('hotel')){
            meta.hotel = {};
            meta.hotel.city = data.city;
            meta.hotel.check_in_date = data.check_in_date;
            meta.hotel.check_in_date = data.check_out_date;
            meta.hotel.number_of_adults = data.number_of_adults;
            meta.hotel.number_of_children = data.number_of_children;
        }
        const order = {
            meta
        }
        await fetch('/api/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order),
        })
            .then(res => res.json())
            .then(json => {
                logger.log("Create", json);
            })
            .catch(e => {
                logger.log("Error on create", e)
            })
            .finally(()=>{
                navigate('/orders');
            })
    }

    async function close(){}

    return (<>

        {isLoading && <Loading />}

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