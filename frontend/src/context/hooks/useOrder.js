import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import findIndexById from "../../handlers/findIndexById";
import setIds from "../../handlers/setIds";
import useFreshData from "../../hooks/useFreshData";

function log(...str){
    // console.log("useOrder\n", ...str);
}

/**
 * Должен предоставлять все функции для загрузки всех ордеров, создания нового, удаления, изменения,
 * */
export default function useOrder({ socketHandler, authHandler }){
    const navigate = useNavigate();

    const { user, isAuthenticated } = authHandler;
    const { socket, isConnected } = socketHandler;

    const [orders, setOrders, updateOrders] = useFreshData({socket, modelName:'Order'});

    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState();


    useEffect(()=>{
        if(isAuthenticated()){
            preloadOrders();
        }
        else {
            if(orders.length){ // Так мы узнаем, что это не первый рендер типа, но нужно будет потом поменять это, у нас же будут буферизированные данные
                log([])
                setOrders([])
            }
        }
    }, [user])


    async function createOrder(order){
        if(!isAuthenticated()) return; // Защита от дурака, на всякий случай
        // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
        // Код делее рабочий, просто, чтобы не насоздавать ордеров закоментил
        return await fetch('/api/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(res=>res.json())
            .then(json => log("Create", json))
            .catch(e => log("Error on create", e))
    }

    /* Не нужно сетить ордера здесь, потому что у нас придет уведомление /save, /delete */
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
            log("update", json);
            navigate(-1)
        }catch(e){
            log(e);
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
            log(json);
            navigate(-1)
        }catch(e){
            log(e);
        }
    }

    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать. Хз */
    async function preloadOrders (){
        setOrdersLoading(true);
        try{
            const res = await fetch('/api/order');
            const json = await res.json();
            setOrdersLoading(false);
            setOrdersError(null);
            if(res.status === 200){
                log("success", json)
                updateOrders(json.map(order => setIds(order)))
            }
            else {
                log("error", json);
                setOrdersError(json)
            }
        }
        catch (err){
            log(err);
            setOrdersError(err.error);
        }

        setOrdersLoading(false);
    }


    return {orders, ordersLoading, ordersError, createOrder, updateOrder, deleteOrder};
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