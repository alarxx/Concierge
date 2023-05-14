
const ApiError = require("../../exceptions/ApiError");


const hotelBookingService = require('./hotel/hotel-booking-service');

const logger = require('../../log/logger')('bookings-service');

/**
 *
 * */
async function _createWithoutSave(booking, orderId, customerId, files){
    const { type } = booking;

    let model;

    if(type === 'hotel/booking'){
        model = await hotelBookingService.createHotelBookingWithoutSave(booking[type], orderId, customerId, files);
    }
    else {
        throw ApiError.BadRequest(`Non-existent service: ${type}`);
    }

    return ({
        type: type,
        [type]: model
    });
}
/*booking: {
    type: booking.type,
        [booking.type]: model.id
}*/
/**
 *
 * */
async function _updateWithoutSave(booking, orderId, customerId, files){
    const { type } = booking;

    let model;

    if(type === 'hotel/booking'){
        model = await hotelBookingService.updateHotelBookingWithoutSave(booking[type], orderId, customerId, files);
    }
    else {
        throw ApiError.BadRequest(`Non-existent service type: ${type}`);
    }

    return ({
        type,
        model
    });
}

async function _save(model, type, files){
    if(type === 'hotel/booking'){
        await hotelBookingService.saveHotelBooking(model, files);
    }
    else {
        throw ApiError.BadRequest(`Non-existent service type: ${type}`);
    }
}

async function defineMany(bookings, order, files){
    if(!bookings || !order){
        throw ApiError.ServerError('No required arguments');
    }
    /*
        order: {
            id: Schema.Types.ObjectId,
            customer: Schema.Types.ObjectId,
            status: String,
            accessHolders: [Schema.Types.ObjectId]?
        }
    */
    const results = await Promise.all(bookings.map(async booking => {
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
        return await _createWithoutSave(booking, order.id, order.customer, files);
    }));

    /*
    results(bookings with populated [type] fields) : [{
        type: String,
        [type]: model
    }]
    */

    // Валидация.
    await Promise.all(results.map(async result => await result[result.type].validate()));

    return results;
}

/**
 * bookings = {
 *     type: String,
 *     [type]: model
 * }
 * */
async function saveMany(bookings, files) {
    if(!bookings){
        throw ApiError.ServerError('No required arguments');
    }
    // Здесь можем засетить каждому файлы или удалить прикрепленные файлы.

    // Сохранение.
    await Promise.all(bookings.map(async booking => {
        const type = booking.type;
        const model = booking[booking.type];
        // здесь files нужно будет как-то распарсить? или создать отдельный api для каждой услуги.
        await _save(model, type, files);
    }));

    return bookings;
}


/**
 * Обновляет брони присвоенные к order-у.
 * Order сюда нельзя кидать order.bookings нераскрытыми? Кажется можно, здесь нужен только их id.
 * Здесь может быть как удаление, так и прибавка, так и ноль изменений. Если кинуть сюда пустой массив, это будет значить удаление всех броней.
 * */
async function updateMany(bookings, order, files) {
    // Нужно удалять booking-и, которые были в order.bookings, но нет в bookings.
    const missing = order.bookings.filter(orderBooking => {
        // Пробегаем по всем order.bookings и проверяем есть ли они в bookings. Ищем те, которых нет.
        return !bookings.some(booking => booking[booking.type] == orderBooking[orderBooking.type]);
    });
    await deleteMany(missing);

    // Здесь нужно сделать так, чтобы booking-и, которые не изменились, не save-лись лишний раз.

    const results = await Promise.all(bookings.map(async booking => {
        // Первое, нужно проверить существует ли такой букинг и правда ли он присвоен этому ордеру.
        // Второе, нужна проверка удаления, добавления и изменения.

        // Если booking = { id, order, customer }, то это обновление,
        // Иначе это создание нового букинга.

        if(!booking.id){
            return await _createWithoutSave(booking, order.id, order.customer, files);
        }

        //Если order.bookings не содержит booking.id
        if(!order.bookings.some(b => b[b.type] == booking.id)){
            throw ApiError.BadRequest('Invalid booking or order data. Please check the provided booking ID.');
        }

        return await _updateWithoutSave(booking, order.id, order.customer, files);

    }));

    await Promise.all(results.map(async result => await result.model.validate()));

    // и здесь гарантируется, что, либо все модели сохранятся, либо ни одна не сохранится.
    await Promise.all(results.map(async result => {
        // здесь files нужно будет как-то распарсить? или создать отдельный api для каждой услуги.
        return await _save(result.model, result.booking.type, files);
    }));

    return results.map(result => result.booking);

}


/**
 * Удаляет id броней присвоенных к заказу.
 * Удалить и открепить все указанные в bookings[{ type, [type] }, ...].
 * */
async function deleteMany(bookings) {
    return await Promise.all(bookings.map(async booking => {
        const { type } = booking;

        let model;

        if(type === 'hotel/booking'){
            model = await hotelBookingService.deleteHotelBooking(booking[booking.type]);
        }
        else {
            throw ApiError.BadRequest(`Non-existent service: ${type}`);
        }

        return model;
    }))

}


/**
 * Проходим по всем booking-ам и раскрываем документы.
 * */
async function populateBookings(order){
    await Promise.all(order.bookings.map(async (booking, index) => {
        // logger.log('booking', booking);
        return await order.populate(`bookings.${index}.${booking.type}`);
    }));
}


module.exports = ({
    defineMany,
    saveMany,
    updateMany,
    deleteMany,

    populateBookings,
});