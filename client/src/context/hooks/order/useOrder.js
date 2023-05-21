import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";

import useFreshData from "../useFreshData";

import Logger from "../../../internal/Logger";
import setIds from "../../../internal/setIds";


export default function useOrder({ socketHandler, authHandler }){

    const logger = useMemo(()=>new Logger('useOrder'), []);

    const navigate = useNavigate();

    const { socket, isConnected } = socketHandler;

    const { data:orders, setData:setOrders } = useFreshData({ socket, modelName:'order' });



    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState(null);

    /** extendedOrders не гарантирует наличия в типе hotel/booking hotel и hotel/room полей */
    // const [extendedOrders, setExtendedOrders] = useState([])
    // const [extendedOrdersLoading, setExtendedOrdersLoading] = useState(true);


    /*
    // Когда сервер отключен, бывает что ордера потом вообще не грузятся
    useEffect(()=>{
        if(ordersError){
            setTimeout(()=>{
                window.location.reload();
            }, 500)
        }
    }, [ordersError])*/


    useEffect(()=>{
        if(!isConnected){
            return;
        }

        const abortController = new AbortController();

        preloadOrders({ signal: abortController.signal });

        return (() => {
            abortController.abort();
        });
    }, [isConnected]);


    /*useEffect(()=>{
        const stop = { signal: false };
        extendOrders(stop);
        return () => {
            stop.signal = true;
        }
    }, [orders])*/


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
            .then(res => res.json())
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
        logger.log('preloadOrders');
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
                setOrders(json);
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


    /*async function extendOrders(stop={ signal: false }){
        // setExtendedOrdersLoading(true);
        setOrdersLoading(true);
        const _extendedOrders = await Promise.all(orders.map(async order => {

            const extendedOrder = extendedOrders.find(eo => eo.id === order.id);


            const bookings = await Promise.all(order.bookings.map(async (booking, i) => {

                logger.log(`extendOrders:`, {booking});

                // Если extendedOrders уже содержит order и нужные данные в booking, то продолжаем.
                if(extendedOrder) {
                    const eo_booking = extendedOrder.bookings.find(b => b.id === booking.id);
                    // logger.log({order, extendedOrder, booking, eo_booking});

                    if(eo_booking){
                        const {type} = eo_booking;
                        if (type === 'hotel/booking') {
                            const {hotel, 'hotel/room': room} = eo_booking;
                            if (hotel && room) {
                                return eo_booking;
                            }
                        }
                    }
                }

                const {type} = booking;

                if (type === 'hotel/booking') {
                    // Дополнить прикрепленную услугу заказа вызвав /api/hotel/room
                    // const response = await fetch('/api/hotel/room/' + booking['hotel/booking']['hotel/room']);
                    const response = await fetch('/api/hotel/' + booking['hotel/booking']['hotel']);
                    console.log(`extendOrders: response:`, response);

                    if(response.status < 200 || response.status >= 300){
                        return booking;
                    }
                    const json = await response.json();
                    setIds(json);
                    console.log(`extendOrders: json:`, {booking, json});
                    // console.log(`extendOrders: api response`, response);
                    return ({...booking, ...json});
                }

                return booking;
            }));

            return ({...order, bookings});

        }));

        if(!stop.signal){
            setExtendedOrders(_extendedOrders);
            // setExtendedOrdersLoading(false);
            setOrdersLoading(false);

        }

    }*/

    async function takeOrder(order){
        logger.log("takeOrder:", {order});
        if(!order || !order.id){
            return logger.log("takeOrder:", "orders is null or not an object", { order });
        }

        socket.emit('take-order', order);
    }


    return ({
        orders,
        // extendedOrders,
        ordersLoading,
        ordersError,

        takeOrder,

        createOrder,
        updateOrder,
        deleteOrder
    });
}