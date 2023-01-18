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

    useEffect(()=>{
        if(user)
            reloadOrders()
    }, [user])


    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать отели. Хз */
    async function orderFetch(url, opt={}){
        setOrdersLoading(true);
        try{
            if(opt.body && typeof opt.body !== 'string')
                opt.body = JSON.stringify(opt.body);

            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                ...opt
            });
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
            // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
            await orderFetch('/api/order', {
                method: 'POST',
                body: form
            })
        }
    }

    async function updateOrder(order){}
    async function deleteOrder(order){}

    async function reloadOrders (){
        await orderFetch('/api/order');
    }


    return {orders, ordersLoading, ordersError, create, reloadOrders, filledData, isFilledBefore};
}