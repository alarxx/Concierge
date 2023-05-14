import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";

import useFreshData from "../useFreshData";

import Logger from "../../../internal/Logger";
import setIds from "../../../internal/setIds";





export default function useOrder({ socketHandler, authHandler }){

    const logger = useMemo(()=>new Logger('useOrder'), [])

    const navigate = useNavigate();

    const { socket } = socketHandler;

    const { data:orders, upsertData:upsertOrders } = useFreshData({ socket, modelName:'order' });
    const [extendedOrders, setExtendedOrders] = useState([])

    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState();


    useEffect(()=>{
        const abortController = new AbortController();

        preloadOrders({ signal: abortController.signal });

        return (() => {
            abortController.abort();
        });
    }, []);


    useEffect(()=>{
        const stop = { signal: false };
        extendOrders(orders, setExtendedOrders, stop);
        return () => {
            stop.signal = true;
        }
    }, [orders])


    async function createOrder(order={bookings:[], accessHolders:[]}, opts={signal: undefined}){
        // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
        // Код делее рабочий, просто, чтобы не насоздавать ордеров закоментил
        return await fetch('/api/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(order),
            ...opts
        })
            .then(res=>res.json())
            .then(json => logger.log("Create", json))
            .catch(e => logger.log("Error on create", e))
    }


    /* Не нужно сетить ордера здесь, потому что у нас придет уведомление /save, /delete */
    async function updateOrder(order={id:''}, opts={signal:undefined}){
        // Как отлавливать ошибку и если что перенаправлять пользователя обратно, чтобы исправить ошибку?
        // Код делее рабочий, просто, чтобы не насоздавать ордеров закоментил
        return await fetch('/api/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(order),
            ...opts
        })
            .then(res => res.json())
            .then(json => logger.log("Update", json))
            .catch(e => logger.log("Error on update", e))
    }


    async function deleteOrder(order={id:''}, opts={signal:undefined}){
        try{
            const res = await fetch('/api/order', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify(order),
                ...opts
            });
            const json = await res.json();
            logger.log(json);
            navigate(-1)
        }catch(e){
            logger.log(e);
        }
    }


    /** функция должна вызываться в начале приложения, а дальше по просьбе user-а или при изменении user-a подгружать */
    async function preloadOrders(opts={ signal: undefined }){
        setOrdersLoading(true);
        try{
            // В любом случае, если пользователь не админ, ему вернутся только его заказы, нужно сделать какую-то сортировку для админов.
            const res = await fetch('/api/order/', opts);

            if(!res){
                // Случится только если signal сработает, вообще зачем этот signal, если хук работает в контексте
                return;
            }

            const json = await res.json();

            if(res.status === 200){
                logger.log("success", json);
                upsertOrders(json);
                setOrdersError(null);
            }
            else {
                logger.log("error", json);
                setOrdersError(json);
            }
        }
        catch (err){
            logger.log(err);
            setOrdersError(err);
        }
        setOrdersLoading(false);
    }


    async function extendOrders(orders, setExtendedOrders, stop={ signal: false }){
        setOrdersLoading(true);
        const extendedOrders = await Promise.all(orders.map(async order => {

            const bookings = await Promise.all(order.bookings.map(async booking => {
                const { type } = booking;
                if(type === 'hotel/booking'){
                    const { hotel, 'hotel/room': room } = booking;
                    if(!hotel || !room){
                        // Дополнить прикрепленную услугу заказа вызвав /api/hotel/room
                        const response = await fetch('/api/hotel/room/' + booking['hotel/booking']['hotel/room']);
                        const json = await response.json();
                        setIds(json);
                        // console.log(`extendOrders:`, {booking, json});
                        // console.log(`extendOrders: api response`, response);
                        return ({...booking, ...json});
                    }
                }
                return booking;
            }));

            return ({...order, bookings});

        }));

        if(!stop.signal){
            setExtendedOrders(extendedOrders);
            setOrdersLoading(false);
        }

    }

    async function takeOrder(order){
        logger.log({order})
        if(!order || !order.id){
            return logger.log("orders is null or not an object", { order })
        }

        socket.emit('take-order', order);
    }


    return ({
        orders:extendedOrders,
        ordersLoading,
        ordersError,

        takeOrder,

        createOrder,
        updateOrder,
        deleteOrder
    });
}