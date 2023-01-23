import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

import findIndexById from "../../handlers/findIndexById";

function log(...str){
    console.log("useOrder\n", ...str);
}

/**
 * Должен предоставлять все функции для загрузки всех ордеров, создания нового, удаления, изменения,
 * */
export default function useOrder({ socketHandler, authHandler }){
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState();

    const { user, isAuthenticated } = authHandler;
    const { socket, isConnected } = socketHandler;

    function _addOrder(order){
        order.id = order._id;
        delete order._id;

        log("/save/order", order);
        setOrders(prev => [...prev, order])
    }

    function _removeOrder(order){
        order.id = order._id;
        delete order._id;

        log("/delete/order", order);
        setOrders(prev => {
            const i = findIndexById(prev, order.id)
            const newOrders = [...prev]
            newOrders.splice(i, 1);
            return newOrders;
        })
    }

    useEffect(()=>{
        socket.on("/save/order", (order)=>{
            _addOrder(order);
        });

        socket.on("/delete/order", (order)=>{
            _removeOrder(order);
        });
    }, [])


    useEffect(()=>{
        if(isAuthenticated()){
            preloadOrders();
        }
        else {
            if(orders.length) // Так мы узнаем, что это не первый рендер типа, но нужно будет потом поменять это, у нас же будут буферизированные данные
                setOrders([])
        }
    }, [user])


    useEffect(()=>{
        log("orders:", orders);
    }, [orders])


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
                // Код делее рабочий, просто, чтобы не насоздавать ордеров закоментил
                const res = await fetch('/api/order', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(order)
                });
                const json = await res.json();
                log("create", json);
                navigate(-1)
            }catch(e){
                log(e);
            }
        }
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
                setOrders(json.map(order => {
                    order.id = order._id;
                    delete order._id;

                    order.meta.id = order.meta._id;
                    delete order.meta._id;

                    return order;
                }))
            }
        }
        catch (err){
            log(err);
            setOrdersLoading(false);
            setOrdersError(err.error);
        }
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