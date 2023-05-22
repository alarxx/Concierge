import React, {useState, useEffect, useMemo, useRef} from 'react';

import {useLocation, useNavigate} from "react-router-dom";

import Logger from "../../../internal/Logger";

import useMultistep from "../../../hooks/useMultistep";

import HotelsList from "./steps/HotelsList";
import HotelSingle from "./steps/HotelSingle";
import HotelConfirm from "./steps/HotelConfirm";
import useBigList from "../../../hooks/useBigList";

const Steps = [
    HotelsList,
    HotelSingle,
    // HotelRoomsList,
    // HotelRoom,
    HotelConfirm,
]

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
    * data.city всегда должен быть определен,
    * hotel может быть null,
    * */
    useEffect(()=>{
        if(!data.city){
            navigate(-1, {replace: true});
        }
    }, [data])

    if(!data.city){
        return;
    }

    const hotelsListHandler = useHotelsListHandler(data.city);

    // const roomsListHandler = useRoomsListHandler(hotel);

    async function submit(){
        // do something with data
        logger.log('submit:', { data });

        const type = 'hotel/booking';

        const meta = {
            needs: ['hotel'],
            city: data.city,
        };

        meta.hotel = {};
        meta.hotel.city = data.city;
        meta.hotel.check_in_date = data.check_in_date;
        meta.hotel.check_out_date = data.check_out_date;
        meta.hotel.number_of_adults = data.number_of_adults;
        meta.hotel.number_of_children = data.number_of_children;

        const order = ({
            bookings: [
                {
                    type,
                    [type]: {
                        'hotel': data.hotel.id,
                        check_in_date: data.check_in_date,
                        check_out_date: data.check_out_date,
                        number_of_adults: data.number_of_adults,
                        number_of_children: data.number_of_children,
                    }
                }
            ],
            meta: meta
        });

        const response = await fetch('/api/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order)
        });

        const json = await response.json();

        logger.log('response', response);
        logger.log({ json });
        navigate('/orders');
        /*
        // Order example
        {
            "customer": "6456c01fb8cb17462973c384",
            "discount": 0, // В общем на заказе, еще есть по отдельности на каждую услугу
            "status": "new",
            "accessHolders": [],
            "bookings": [{
                "type": "hotel/booking",
                "hotel/booking": {
                    "hotel/room": "64571f7499180de50f1bb787",
                    checkInDate,
                    checkOutDate,
                    price,
                    discount,
                    isPaid,
                }
            }],
        }
        * */
        /*
        // Hotel/Booking Schema

            order: id, auto
            customer: id, auto

            'hotel/room': {
                type: Schema.Types.ObjectId,
                ref: 'Hotel/Room',
            },

            checkInDate: {
                type: Date,
                default: () => new Date(), // Просто хз как из postman-a ставить
                required: true,
            },
            checkOutDate: {
                type: Date,
                default: () => new Date(), // Просто хз как из postman-a ставить
                required: true,
            },

            // Bill
            price: {
                type: Number, // or String?
                // required: true,
            },
            discount: {
                type: Number,
                min: 0,
                max: 100,
                default: 0
            },
            bill_file: { // Счет выставленный нам и оплачиваемый Concierge
                type: Schema.Types.ObjectId,
                ref: 'File',
            },
            isPaid: {
                type: Boolean,
                default: false
            },
            file: { // Подтверждающий документ, не знаю
                type: Schema.Types.ObjectId,
                ref: 'File'
            },

            timestamps: true,
        },
    */
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
            // roomsListHandler={roomsListHandler}
        />}
    </>);
}