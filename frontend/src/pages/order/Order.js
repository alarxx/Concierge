import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import F1_Plans from "./forms/F1_Plans";
import F2_Needs from "./forms/F2_Needs";
import F3_General from "./forms/F3_General";
import F4_Tickets from "./forms/F4_Tickets";
import F5_Housing from "./forms/F5_Housing";
import F6_HotelsSelection from "./forms/F6_HotelsSelection";
import F7_Transport from "./forms/F7_Transport";
import F8_Calculation from "./forms/F8_Calculation";

import MultistepForm from "../../components/form/MultistepForm";

import {useAppContext} from "../../context/AppContext";

const FORMS = [
    F1_Plans,
    F2_Needs,
    F3_General,
    F4_Tickets,
    F5_Housing,
    // F6_HotelsSelection,
    F7_Transport,
    F8_Calculation
]

/* На самом деле лучше не писать это так, а устанавливать default значения в каждой форме */
// Это order_meta, все что выбирает пользователь идет в order_meta, сам order может менять только manager
const _INITIAL_DATA_DEFAULT = {
    type: 'informal', // ['business_trip', 'event', 'informal']
    needs: [], //['housing', 'transport', 'travel', 'informal']
    num_of_people: 1,
    departure_place: '',
    destination_place: '',

    travel_transport: null, //['airplane', 'train', null]
    date_start: '',
    date_end: '',
    one_way_ticket: false,

    housing: null, //['hotel', 'apartment', null]
    separateApartments: false,

    transport: null, //['car', 'limousine']
    driverNeeded: false,

    description: '',
    preferred_services: [] //ObjectIds
}
const _useFilled = () => {
    const location = useLocation()
    const [isFilledBefore, setFilledBefore] = useState(false)
    const [data, setData] = useState(_INITIAL_DATA_DEFAULT)

    useEffect(()=>{
        if(location.state?.order){
            setFilledBefore(true)
            setData(location.state.order)
        }
    }, [location])

    return {data, setData, isFilledBefore}
}

/**
 * Нам нужно как-то сохранять контекст между роутами
 * */
export default function Order({ }) {
    const {orderHandler} = useAppContext();

    const {data, setData, isFilledBefore} = _useFilled()

    const {createOrder} = orderHandler;

    return (
        <>
            <MultistepForm
                forms={FORMS}
                data={data}
                setData={setData}
                init_step={isFilledBefore ? -1 : 0}
                onSubmit={createOrder}
                submitButtonName={"Оставить заявку"}
            />
        </>
    );
}