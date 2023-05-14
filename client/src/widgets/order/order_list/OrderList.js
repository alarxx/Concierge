import React, {useEffect, useMemo} from "react";
import OrderCard from "../order_card/OrderCard";
import Loader from "../../../shared/ui/loader/Loader";
import {useAppContext} from "../../../context/AppContext";
import Block from "../../../shared/ui/block/Block";
import Logger from "../../../internal/Logger";

export default function OrderList({}) {

    const logger = useMemo(()=>new Logger('Orders'), [])
    
    const { orderHandler, } = useAppContext();
    const { orders, ordersLoading, takeOrder } = orderHandler;

    useEffect(()=>{
        console.log('orderLoadingg = ',ordersLoading)
    })

    return (<>
        {ordersLoading ? <Block isAlignCenter={true}><Loader color={'black'}/></Block> : orders.map((order, i) => {
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