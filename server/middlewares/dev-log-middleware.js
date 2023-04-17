/** Используем логирование в консоль в окружении разработки */
const colors = require("../log/colors");
const object2string = require("../log/object2string");
module.exports = (req, res, next) => {
    const request = {
        user: req.user?.email,
        url: req.url,
        method: req.method,
        headers: {'Content-Type': req.headers['content-type']},
    }
    if (request.method === 'GET')
        request.query = req.query;
    else
        request.body = req.body;
    console.log(colors.bright_cyan('REQUEST'), object2string(request));
    next();
}