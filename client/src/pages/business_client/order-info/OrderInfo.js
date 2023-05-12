import React, {useEffect, useMemo, useState} from 'react';

import {useNavigate, useParams} from "react-router-dom";

import {useAppContext} from "../../../context/AppContext";


export default function Orders({}){

    const navigate = useNavigate();
    const { id } = useParams();

    const { orderHandler, } = useAppContext();
    const { orders, ordersLoading, takeOrder } = orderHandler;

    return (<>
        <h1>Order id:{id}</h1>
    </>)
}