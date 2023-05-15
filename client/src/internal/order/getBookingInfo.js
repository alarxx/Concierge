import Logger from "../Logger";

import statusEnum from "./StatusEnum";
import monthName from "../../features/chat/day_in_chat/model/monthName";

const logger = new Logger('getBookingInfo');

/**
 * должен вернуть:
 * {
 *     status,
 *     title,
 *     description,
 * }
 * */
export default function(extendedBooking, extendedOrder){
    logger.log({ extendedOrder, extendedBooking });

    const status = statusEnum[extendedBooking[extendedBooking.type].status];

    if(extendedBooking.type === 'hotel/booking'){
        const booking = extendedBooking['hotel/booking'];
        const hotelName = extendedBooking.hotel?.name;
        const roomName = extendedBooking['hotel/room']?.name;

        const words = extendedBooking.hotel?.city.split(",", 2); // 'Казахстан, Астана'.split(",", 2);
        const city = words?.length === 2 ? words[1]: words;

        const start_date = new Date(booking.checkInDate);
        const final_date = new Date(booking.checkOutDate);
        return ({
            status,
            last4IDDigits: booking.id.substring(booking.id.length - 4),
            name: `${city}, ${hotelName}`,
            description: roomName,
            start_date: `${start_date.getDate()} ${monthName(start_date.getMonth()).substring(0, 3).toLowerCase()}.`,
            final_date: `${final_date.getDate()} ${monthName(final_date.getMonth()).substring(0, 3).toLowerCase()}.`,
            customerName: extendedOrder.customer.name,
            number_of_adults:booking.number_of_adults  ? booking.number_of_adults : '1 взрослый',
            number_of_children:booking.number_of_children,
        });
    }
    else {
        throw new Error('nonexistent booking type');
    }
}