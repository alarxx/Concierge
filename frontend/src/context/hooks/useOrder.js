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
export default function useOrder({ user, isAuthenticated }){
    const navigate = useNavigate();

    const {filledData, isFilledBefore} = _useFilled()

    const [orders, setOrders] = useState();
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState();

    async function createOrder(order){
        // Убеждаемся, что пользователь авторизован и создаем заказ

        if (!isAuthenticated()) {
            navigate('/register/simple', {
                replace: true,
                state: {
                    redirect: '/order',
                    order: order
                }
            });
        }
        else {
            // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
            try{
                const res = await fetch('/api/order', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(order)
                });
                const json = await res.json();
                console.log(json);
            }catch(e){
                console.log(e);
            }
            reloadOrders();
        }
    }

    async function updateOrder(order){
        try{
            const res = await fetch('/api/order', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(order)
            });
            const json = await res.json();
            console.log(json);

            reloadOrders();
        }catch(e){
            console.log(e);
        }
    }

    async function deleteOrder(order){
        try{
            const res = await fetch('/api/order', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify(order)
            });
            const json = await res.json();
            console.log(json);

            reloadOrders();
        }catch(e){
            console.log(e);
        }
    }

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать отели. Хз */
    async function reloadOrders (){
        setOrdersLoading(true);
        try{
            const res = await fetch('/api/order');
            const json = await res.json();
            setOrdersLoading(false);
            setOrdersError(null);
            setOrders(json);
            console.log(json);
        }
        catch (err){
            setOrdersLoading(false);
            setOrdersError(err.error);
        }
    }


    return {orders, ordersLoading, ordersError, createOrder, updateOrder, deleteOrder, reloadOrders, filledData, isFilledBefore};
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/