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

    useEffect(()=>{logger.log({ordersLoading})}, [ordersLoading])

    useEffect(()=>{
        const sorted = [...orders].sort((a/*2013; 2002*/, b/*2002; 2013*/) => {
            // - a идет первым
            // + b идет первым
            // новый - значит значение будет больше, значит мне нужно по убыванию 2013,2012,2000
            // logger.log({a: new Date(a.createdAt), b: new Date(b.createdAt), value: new Date(b.createdAt) - new Date(a.createdAt)});
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        setSortedOrders(sorted);
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