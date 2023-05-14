const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/order/order-controller');

const { createOne, updateOne, deleteOne, findByQueryParams } = controller;

Router.use(require('../../../middlewares/checkAuthenticated'));

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .delete(deleteOne)

/**
 *
 * Возвращает order по фильтрам. Можно давать несколько unique полей.
 *
 * Каждый найденный и подходящий order:
 *
 * 1) populate bookings.
 * Проходим по всем booking-ам и раскрываем документы.
 * После этого клиент будет запрашивать информацию об услугах на дополнительных маршрутах.
 *
 * 2) выводит расширенную информацию customer (объект), не populate, но вместо одного id выводим объект {name, email, phone....}.
 * Добавляем или расширяем информацию customer id -> {name, phone, email}.
 * Не populate, нельзя populate-ить модель пользователя.
 *
 * */
Router.route('/')
    .get(findByQueryParams)

module.exports = Router;