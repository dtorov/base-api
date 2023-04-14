const ApiExeption = require("../exceptions/ApiExeption");
const userService = require("../service/UserService");
const { validationResult  } = require('express-validator')



class UserController {

    async registration (req, res, next) {
        try {
            const validationErrors = validationResult(req);
            if (!validationErrors.isEmpty()) {
                console.log('Ошибка валидации данных', validationErrors)
                return next(ApiExeption.BadRequest('Ошибка валидации данных', validationErrors.array()))
            }
            const { username, email, password } = req.body;
            const newUser = await userService.registration( username, email, password );
            res.cookie('refreshToken', newUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    }

    async login (req, res, next) {
        try {
            const { username, password } = req.body;
            const userData = await userService.login( username, password );
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout( refreshToken );
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refreshTokens( refreshToken );
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            res.json({a: 'b'})
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();