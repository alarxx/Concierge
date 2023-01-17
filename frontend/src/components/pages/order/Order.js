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

import MultistepForm from "../../form/MultistepForm";

import {useAppContext} from "../../context/AppContext";

const INITIAL_DATA_DEFAULT = {
    type: '',
    needs: [],
    num_of_people: 0,
    departure_place: '',
    destination_place: '',

    travel_transport: '',
    date_start: '',
    date_end: '',
    roundTrip: '',

    housing: '',
    separateApartments: '',

    transport: '',
    driverNeeded: false,

    description: '',
    preferred_services: []
}

const FORMS = [
    F1_Plans,
    F2_Needs,
    F3_General,
    F4_Tickets,
    F5_Housing,
    F6_HotelsSelection,
    F7_Transport,
    F8_Calculation
]

const useInitialData = (DATA_DEFAULT) => {
    const location = useLocation();
    const [filledBefore, ] = useState(location.state?.order)
    const [initData, ] = useState( filledBefore ? location.state.order : DATA_DEFAULT)
    return {initData, filledBefore}
}

/**
 * Нам нужно как-то сохранять контекст между роутами
 * */
export default function Order({ }) {
    const navigate = useNavigate();

    const {initData, filledBefore} = useInitialData(INITIAL_DATA_DEFAULT);

    const {authHandler} = useAppContext();
    const {isAuthenticated} = authHandler;

    function onSubmit(data) {
        if (!isAuthenticated()) {
            navigate('/register', {
                replace: true,
                state: {
                    redirect: '/order',
                    order: data
                }
            });
        }
        else {
            // Убеждаемся, что пользователь авторизован и создаем заказ
            console.log("order", data);
        }
    }

    return (
        <>
            <MultistepForm
                forms={FORMS}
                INITIAL_DATA={initData}
                INIT_STEP={filledBefore ? 'last' : 0}
                onSubmit={onSubmit}
                submitButtonName={"Оставить заявку"}
            />
        </>
    );
}