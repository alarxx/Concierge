import React, {useEffect, useMemo, useState} from "react";
import OrderCard from "../order_card/OrderCard";
import Loader from "../../../shared/ui/loader/Loader";
import {useAppContext} from "../../../context/AppContext";
import Block from "../../../shared/ui/block/Block";
import Logger from "../../../internal/Logger";
import {useNavigate} from "react-router-dom";

export default function OrderList({}) {
    const logger = useMemo(()=>new Logger('OrderList'), [])

    const navigate = useNavigate();

    const { orderHandler, } = useAppContext();
    const { orders, ordersLoading, takeOrder } = orderHandler;

    /* It is not guaranteed that orders sorted!!! (not guaranteed, but now the old ones are first) */
    const [sortedOrders, setSortedOrders] = useState([]);

    useEffect(()=>{
        setSortedOrders(orders.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }));
    }, [orders])


    if(ordersLoading){
        return (<>
            <Block isAlignCenter={true}>
                <Loader color={'black'}/>
            </Block>
        </>)
    }

    return (<>
        {sortedOrders.map((order, i) => {
            return (<div key={i}>
                <OrderCard
                    order={order}
                    onClick={e => {
                        logger.log({order})
                        navigate(`/orders/${order.id}`);
                    }}
                />
            </div>);
        })}
    </>)
}