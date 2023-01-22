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

/**
 * Нам нужно как-то сохранять контекст между роутами
 * */
export default function Order({ }) {
    const {orderHandler} = useAppContext();
    const {createOrder, filledData, isFilledBefore} = orderHandler;

    useEffect(()=>console.log(filledData), [filledData]);

    return (
        <>
            <MultistepForm
                forms={FORMS}
                INITIAL_DATA={filledData}
                INIT_STEP={isFilledBefore ? 'last' : 0}
                onSubmit={createOrder}
                submitButtonName={"Оставить заявку"}
            />
        </>
    );
}