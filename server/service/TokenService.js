const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')


class TokenService {

    generateToken (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    saveRefreshToken (user_id, refreshToken) {
        return UserModel.findByIdAndUpdate(user_id, {refreshToken})
    }


    removeRefreshToken (user_id) {
        return UserModel.findByIdAndUpdate(user_id, {refreshToken: ''})
    }

    removeAccessToken (user_id) {
        return UserModel.findByIdAndUpdate(user_id, {accessToken: ''})
    }

    validateRefreshToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    findUserByRefreshToken (refreshToken) {
        return UserModel.findOne({refreshToken}, '_id')
    }

    validateAccessToken (token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = new TokenService();