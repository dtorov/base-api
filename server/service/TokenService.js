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
}

module.exports = new TokenService();