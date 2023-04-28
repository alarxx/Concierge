const ApiError = require("../../exceptions/ApiError");

/**
 * Эта функция проверяет наличие обязательных полей в теле запроса body.
 * Если какие-то поля отсутствуют, то функция генерирует ошибку BadRequest с сообщением,
 * которое указывает на отсутствующие поля.
 * */
function checkNecessaryFields(body={}, fields=['skip', 'limit']){
    const missingFields = fields.filter(field => !body[field]);
    if (missingFields.length) {
        throw ApiError.BadRequest(`Required fields missing: ${missingFields.map(field => `'${field}'`).join(', ')}`);
    }
}

module.exports = checkNecessaryFields;