const ApiExeption = require("../exceptions/ApiExeption");

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiExeption) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка API'})
}