const ApiExeption = require("../exceptions/ApiExeption");
const skeletonService = require("../service/SkeletonService");

class SkeletonController {

    async getTestData (req, res, next) {
        try {
            const testData = skeletonService.getTestData('get payload');
            if (!testData) return next(ApiExeption.BadRequest('Ошибка обработки данных'))
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async postTestData (req, res, next) {
        try {
            const { payload } = req.body;
            const testData = skeletonService.postTestData(payload);
            if (!testData) return next(ApiExeption.BadRequest('Ошибка обработки данных'))
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SkeletonController();