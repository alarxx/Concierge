import React, {useEffect, useMemo, useState} from 'react';
import useFreshData from "../useFreshData";
import {useNavigate} from "react-router-dom";

import setIds from '../../../../internal/setIds';
import Logger from "../../../../internal/Logger";

export default function useOrderData({ socketHandler, authHandler }){

    const logger = useMemo(()=>new Logger('useOrderData'), [])

    const navigate = useNavigate();

    const { user, isAuthenticated } = authHandler;
    const { socket } = socketHandler;

    const { data:orders, setData:setOrders } = useFreshData({socket, modelName:'Order'});

    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState();


    /*// old
    useEffect(()=>{
        if(isAuthenticated){
            preloadOrders();
        }
        else { // лучше этот момент отдельным useEffect-ом обрабатывать.
            if(orders.length){ // Так мы узнаем, что это не первый рендер типа, но нужно будет потом поменять это, у нас же будут буферизированные данные
                logger.log([])
                setOrders([])
            }
        }
    }, [user])*/

    useEffect(()=>{
        const abortController = new AbortController();

        if(isAuthenticated){
            preloadOrders({ signal: abortController.signal });
        }

        return (() => {
            abortController.abort();
        });
    }, [user]);


    async function createOrder(order={bookings:[], accessHolders:[]}, opts={signal: undefined}){
        // Защита от дурака, на всякий случай
        if(!isAuthenticated) {
            return;
        }

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
        // Защита от дурака, на всякий случай
        if(!isAuthenticated) {
            return;
        }

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
        // Защита от дурака, на всякий случай
        if(!isAuthenticated) {
            return;
        }

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
        if(!isAuthenticated){
            return;
        }

        setOrdersLoading(true);
        try{
            const res = await fetch('/api/order/?' + new URLSearchParams({ customer: user.id }), opts);

            if(!res){
                // Случится только если signal сработает, вообще зачем этот signal, если хук работает в контексте
                return;
            }

            const json = await res.json();

            setOrdersLoading(false);

            if(res.status === 200){
                logger.log("success", json);
                setOrders(setIds(json));
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


    return ({
        orders,
        ordersLoading,
        ordersError,

        createOrder,
        updateOrder,
        deleteOrder
    });
}