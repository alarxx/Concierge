import React, {useState} from 'react'

/**
 * Должен предоставлять все функции для загрузки всех ордеров, создания нового, удаления, изменения,
 * */
export default function useOrder({socket, user, isAuthenticated}){
    const [orders, setOrders] = useState();
    const [ordersLoading, setUserLoading] = useState(true);
    const [ordersError, setUserError] = useState();

    function create(form){

    }

    function getMyOrders(){

    }

    return {};
}