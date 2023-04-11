module.exports = class UserLoginDto {
    username;
    _id;
    email;
    role;

    constructor (model) {
        this._id = model._id;
        this.username = model.username;
        this.email = model.email;
        this.role = model.role;
    }
}