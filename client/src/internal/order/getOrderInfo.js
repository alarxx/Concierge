import Logger from "../Logger";

import statusEnum from "./StatusEnum";
import getBookingInfo from "./getBookingInfo";

const logger = new Logger('getOrderInfo');
export default function getOrderInfo(order){
    logger.log({ order });

    // name достаем из meta, большую часть достаем из meta.

    if(!order){
        logger.log("ORDER IS NUll")
        return ({
            status: '',
            last4IDDigits: '',
            customerName: '',
            name: '',
        });
    }


    const status = statusEnum[order.status];

    return ({
        status,
        last4IDDigits: String(order.id).substr(-4),
        customerName: order.customer.name,
        name: 'Город: услуги.'
    });
}