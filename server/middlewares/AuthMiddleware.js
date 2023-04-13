const ApiExeption = require("../exceptions/ApiExeption");
const TokenService = require("../service/TokenService");


module.exports = function (req, res, next) {
    try {

        const authHeader = req.header('authorization');
        if (!authHeader) {
            return next(ApiExeption.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiExeption.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiExeption.UnauthorizedError());
        }

        req.user = userData;
        next();

    } catch (e) {
        return next(ApiExeption.UnauthorizedError());
    }
}