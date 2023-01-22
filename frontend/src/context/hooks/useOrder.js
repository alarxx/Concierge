import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";

function findIndexById (array, id) {
    return array.findIndex(obj => obj.id == id);
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


    useEffect(()=>{
        socket.on("/save/order", (order)=>{
            console.log("/save/order", order);
            setOrders(prev => [...prev, order])
        });
        socket.on("/delete/order", (order)=>{
            console.log("/delete/order", order);
            setOrders(prev => {
                const i = findIndexById(prev, order.id)
                const newOrders = [...prev]
                newOrders.splice(i, 1);
                return newOrders;
            })
        });
    }, [])


    useEffect(()=>{
        if(isAuthenticated()){
            preloadOrders();
        }
        else {
            if(orders.length)
                setOrders([])
        }
    }, [user])


    useEffect(()=>{
        console.log("orders:", orders);
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
                console.log("POST /api/order", order);
                /*const res = await fetch('/api/order', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(order)
                });
                const json = await res.json();
                console.log(json);*/
            }catch(e){
                console.log(e);
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
            console.log(json);
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
        }catch(e){
            console.log(e);
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
            if(res.status === 200)
                setOrders(json);
        }
        catch (err){
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