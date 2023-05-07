
const ApiError = require("../../exceptions/ApiError");


const hotelBookingService = require('./hotel/hotel-booking-service');

const logger = require('../../log/logger')('bookings-service');


/**
 * Создает и присваивает id броней к заказу.
 * */
async function createMany(order, bookings=[]) {
    /*
        order: {
            customer: Schema.Types.ObjectId,
            status: String,
            accessHolders: [Schema.Types.ObjectId]?
        }
    */
    order.bookings = await Promise.all(bookings.map(async booking => {
        /*
            booking: {
                type: 'hotel/booking',
                ['hotel/booking']: {
                    ['hotel/room']: Schema.Types.ObjectId,
                    price: Number,
                    ...
                }
            }
            Создать booking в зависимости от booking.type.
            Видимо придется писать if-ы.
         */
        let res;

        const { type } = booking;

        if(type === 'hotel/booking'){
            res = await hotelBookingService.createHotelBooking(booking[type], order.customer);
        }
        else {
            throw ApiError.BadRequest(`Non-existent service: ${type}`);
        }

        return { type, [type]: res.id };
    }));

    return order;
}


/**
 * Обновляет брони присвоенные к order-у.
 * Order сюда нельзя кидать order.bookings нераскрытыми? Кажется можно, здесь нужен только их id.
 * Здесь может быть как удаление, так и прибавка, так и ноль изменений. Если кинуть сюда пустой массив, это будет значить удаление всех броней.
 * */
async function updateMany(order, bookings=[]) {
    await Promise.all(bookings.map(async booking => {
        // Первое, нужно проверить существует ли такой букинг и правда ли он присвоен этому ордеру.
        // Второе, нужна проверка удаления, добавления и изменения.
    }));
}


/**
 * Удаляет id броней присвоенных к заказу.
 * Удалить и открепить все указанные в bookings[].
 * */
async function deleteMany(order, bookings=[]) {

}


/**
 * Проходим по всем booking-ам и раскрываем документы.
 * */
async function populateBookings(order){

}



module.exports = ({
    createMany,
    updateMany,
    deleteMany,

    populateBookings,
});