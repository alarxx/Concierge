import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from "react-router-dom";

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
    const location = useLocation();
    const [isFilledBefore, setFilledBefore] = useState()
    const [filledData, setInitData] = useState( )
    useEffect(()=>{
        const isFilledB = Boolean(location.state?.order);
        setFilledBefore(isFilledB)
        setInitData(isFilledB ? location.state.order : _INITIAL_DATA_DEFAULT)
    }, [location])

    return {filledData, isFilledBefore}
}

/**
 * Должен предоставлять все функции для загрузки всех ордеров, создания нового, удаления, изменения,
 * */
export default function useOrder({ isAuthenticated }){
    const navigate = useNavigate();

    const {filledData, isFilledBefore} = _useFilled()

    const [orders, setOrders] = useState();
    const [ordersLoading, setUserLoading] = useState(true);
    const [ordersError, setUserError] = useState();

    async function create(form){
        // Убеждаемся, что пользователь авторизован и создаем заказ

        if (!isAuthenticated()) {
            navigate('/register', {
                replace: true,
                state: {
                    redirect: '/order',
                    order: form
                }
            });
        }
        else {
            console.log('form', form);
            const response = await fetch('/api/order', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({meta: form})
            });
            const json = await response.json();
            console.log(json);
            // Что дальше делать? navigate(to)
        }

    }

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а подгружать отели. Хз */
    async function updateOrders(){
        const response = await fetch('/api/order');
        const json = await response.json();
        console.log(json);
    }

    useEffect(()=>{
        updateOrders();
    },[])

    return {orders, ordersLoading, ordersError, create, updateOrders, filledData, isFilledBefore};
}