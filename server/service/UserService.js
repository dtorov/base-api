const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const TokenService = require('../service/TokenService');
const UserLoginDto = require("../dto/UserLoginDto");
const ApiExeption = require("../exceptions/ApiExeption");


class UserService {

    async registration (username, email, password) {
        const userExist = await UserModel.findOne({username});
        if(userExist) throw ApiExeption.BadRequest(`Пользователь с именем ${username} уже существует.`);
        const passwordHash = await bcrypt.hash(password, 5);
        const newUser = await UserModel.create({username, email, password: passwordHash});
        const userLoginDto = new UserLoginDto(newUser);
        const tokens = TokenService.generateToken({ ...userLoginDto});
        await TokenService.saveRefreshToken(newUser._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userLoginDto
        }
    }

    async login (username, password) {
        const user = await UserModel.findOne({username});
        if (!user) throw ApiExeption.BadRequest(`Пользователь с именем ${username} не зарегистрирован.`);
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) throw ApiExeption.BadRequest(`Не правильный пароль.`);
        const userLoginDto = new UserLoginDto(user);
        const tokens = TokenService.generateToken({ ...userLoginDto});
        await TokenService.saveRefreshToken(user._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userLoginDto
        }
    }

    async logout (refreshToken) {
        const user = await UserModel.findOne({refreshToken});
        if (!user) throw ApiExeption.BadRequest(`Такой сессии не существует.`);
        await TokenService.removeRefreshToken(user._id);
        return {msg: 'Выход выполнен'};
    }

    async refreshTokens (refreshToken) {
        if (!refreshToken) {
            throw ApiExeption.UnauthorizedError();
        }

        const userFromToken = TokenService.validateRefreshToken(refreshToken);
        const userFromDb = await TokenService.findUserByRefreshToken(refreshToken);

        if (!userFromToken || !userFromDb || userFromToken?._id !== '' + userFromDb?._id) {
            throw ApiExeption.UnauthorizedError();
        }

        const userLoginDto = new UserLoginDto(userFromDb);
        const tokens = TokenService.generateToken({ ...userLoginDto });
        await TokenService.saveRefreshToken(userLoginDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userLoginDto
        }
    }
}

module.exports = new UserService();