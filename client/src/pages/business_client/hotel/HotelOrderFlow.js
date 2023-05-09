import React, {useState, useEffect, useMemo, useRef} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import Logger from "../../../internal/Logger";

import useMultistep from "../../../hooks/useMultistep";

import HotelsList from "../../../features/hotel/HotelsList";
import HotelSingle from "../../../features/hotel/HotelSingle";
import HotelRoomsList from "../../../features/hotel/HotelRoomsList";
import HotelRoom from "../../../features/hotel/HotelRoom";
import HotelConfirm from "../../../features/hotel/HotelConfirm";

const Steps = [
    HotelsList,
    HotelSingle,
    HotelRoomsList,
    HotelRoom,
    HotelConfirm,
];

export default function HotelOrderFlow(){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(() => new Logger('HotelOrderFlow'), []);

    const location = useLocation();

    const [data, setData] = useState(() => location.state?.data ? location.state.data : {});

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

    const {currentStepIndex, Step, isFirstStep, isLastStep, back, next, goTo} = useMultistep(Steps);

    return (<>
        {<Step { ...data} upsertFields={upsertFields} next={next} back={back} />}
    </>);
}