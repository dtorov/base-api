const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const TokenService = require('../service/TokenService');
const UserLoginDto = require("../dto/UserLoginDto");

class UserService {

    async registration (username, email, password) {
        const userExist = await UserModel.findOne({username})
        if(userExist) throw new Error(`Пользователь с именем ${username} уже существует.`)
        const passwordHash = await bcrypt.hash(password, 5)
        const newUser = await UserModel.create({username, email, password: passwordHash})
        const userLoginDto = new UserLoginDto(newUser)
        const tokens = TokenService.generateToken({ ...userLoginDto})
        await TokenService.saveRefreshToken(newUser._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userLoginDto
        }
    }
}

module.exports = new UserService();