import Logger from "../Logger";

import statusEnum from "./StatusEnum";
import getBookingInfo from "./getBookingInfo";

const logger = new Logger('getOrderInfo');

const serviceNameEnum = ({
    hotel: 'Отель',
    airfare: 'Авиабилеты',
    transfer: 'Трансфер',
});

function getServices(meta){
    // needs -> serviceNameEnum[needs[i]]
    return meta.needs.map(service => serviceNameEnum[service].toLowerCase()).join(', ');
}

function getName(meta){
    logger.log("getName:", meta);
    return `${getCity(meta)}: ${getServices(meta)}`;
}

function getCity(meta){
    const words = meta.city?.split(",", 2); // 'Казахстан, Астана'.split(",", 2);
    return words?.length === 2 ? words[1]: words;
}

export default function getOrderInfo(order){
    logger.log({ order });

    // name достаем из meta, большую часть достаем из meta.

    if(!order){
        logger.log("ORDER IS NUll");
        return ({
            status: { text: '', variant: '' },
            last4IDDigits: '',
            customerName: '',
            name: '',
        });
    }

    const status = statusEnum[order.status];
    const name = getName(order.meta);

    return ({
        status,
        last4IDDigits: String(order.id).substr(-4),
        customerName: order.customer.name,
        name,
        managerName: order.manager?.name ? order.manager.name : 'Менеджер',
    });
}