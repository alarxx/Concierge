import Logger from "../Logger";

import statusEnum from "./StatusEnum";
import getBookingInfo from "./getBookingInfo";

const logger = new Logger('getOrderInfo');
export default function(extendedOrder){
    logger.log({ extendedOrder });

    const status = statusEnum[extendedOrder.status];

    extendedOrder.bookings.map(booking => {
        getBookingInfo(booking, extendedOrder);
    })

    return ({
        status,
        last4IDDigits: String(extendedOrder.id).substr(-4),
        customerName: extendedOrder.customer.name,
        name,
    });
}