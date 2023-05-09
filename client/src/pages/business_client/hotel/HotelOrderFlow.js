import React, {useState, useEffect, useMemo, useRef} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import Logger from "../../../internal/Logger";

import useMultistep from "../../../hooks/useMultistep";

import HotelsList from "./steps/HotelsList";
import HotelSingle from "./steps/HotelSingle";
import HotelRoomsList from "./steps/HotelRoomsList";
import HotelRoom from "./steps/HotelRoom";
import HotelConfirm from "./steps/HotelConfirm";
import useBigList from "../../../hooks/useBigList";

const Steps = [
    HotelsList,
    HotelSingle,
    HotelRoomsList,
    HotelRoom,
    HotelConfirm,
];

function useRoomsListHandler(hotel){
    // const [hotelRooms, setHotelRooms] = useState({});

    const opts = useMemo(()=>{
        return { hotel: hotel?.id ? hotel.id : '123' };
    }, [hotel])

    const roomsListHandler = useBigList('/api/hotel/room/pagination/', opts);

    // Оптимизация загрузки ? Не грузить уже загруженное
    // useEffect(()=>{
    //     setHotelRooms(prev => {
    //         return ({...prev, hotelsListHandler});
    //     })
    // }, [hotel]);

    const { items, loadMoreItems } = roomsListHandler;

    useEffect(()=>{
        if(!loadMoreItems){
            return;
        }

        loadMoreItems(0, 5);
    }, [hotel]);

    return roomsListHandler; // [hotel.id];
}
function useHotelsListHandler(city){

    const opts = useMemo(()=>{
        return { city };
    }, [city])

    const roomsListHandler = useBigList('/api/hotel/pagination/', opts);

    return roomsListHandler; // [hotel.id];
}

export default function HotelOrderFlow(){
    // Логгер просто будет прописывать из какого модуля вызван лог
    // Плюс в production logger не будет выводить в консоль ничего.
    const logger = useMemo(() => new Logger('HotelOrderFlow'), []);

    const location = useLocation();
    const navigate = useNavigate();

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

    const {Step, back, next} = useMultistep(Steps);

    /* *
    * city всегда должен быть определен,
    * hotel может быть null,
    * */
    const { city, hotel } = data;

    const hotelsListHandler = useHotelsListHandler(city);

    const roomsListHandler = useRoomsListHandler(hotel);

    async function submit(){
        // do something with data
        logger.log('submit:', { data });
    }

    async function close(){
        navigate('/new', {
            replace: true,
            state: { data }
        })
    }

    return (<>
        {<Step
            data={data}
            upsertFields={upsertFields}

            next={next}
            back={back}

            submit={submit}
            close={close}

            hotelsListHandler={hotelsListHandler}
            roomsListHandler={roomsListHandler}
        />}
    </>);
}