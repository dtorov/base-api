const userService = require("../service/UserService");

class UserController {

    async registration (req, res, next) {
        try {
            const { username, email, password } = req.body;
            const newUser = await userService.registration( username, email, password );
            res.cookie('refreshToken', newUser.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(newUser)
        } catch (e) {
            console.log(e)
            return res.json({message: e})
        }
    }

    async login (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async logout (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async refresh (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async getUsers (req, res, next) {
        try {
            res.json({a: 'b'})
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new UserController();