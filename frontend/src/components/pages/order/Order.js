import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import F1_Plans from "./forms/F1_Plans";
import F2_Needs from "./forms/F2_Needs";
import F3_General from "./forms/F3_General";
import F4_Tickets from "./forms/F4_Tickets";
import F5_Housing from "./forms/F5_Housing";
import F6_HotelsSelection from "./forms/F6_HotelsSelection";
import F7_Transport from "./forms/F7_Transport";
import F8_Calculation from "./forms/F8_Calculation";

import MultistepForm from "../../form/MultistepForm";

const INITIAL_DATA = {
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

const forms = [
    F1_Plans,
    F2_Needs,
    F3_General,
    F4_Tickets,
    F5_Housing,
    F6_HotelsSelection,
    F7_Transport,
    F8_Calculation
]

export default function Order({ }) {
    const navigate = useNavigate();

    function onSubmit(data){
        // что делать после того, как у нас готова форма?
        console.log(data);
        navigate('/register')
    }

    return (
        <MultistepForm
            forms={forms}
            INITIAL_DATA={INITIAL_DATA}
            onSubmit={onSubmit}
            submitButtonName={"Оставить заявку"}
        />
    );
}