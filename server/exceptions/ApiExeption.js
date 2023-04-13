module.exports = class ApiExeption extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError () {
        return new ApiExeption(401, 'Пользователь не авторизован');
    }

    static BadRequest(message, errors = []) {
        return new ApiExeption(400, message, errors);
    }

}