
class SkeletonService {

    getTestData (payload) {
        const data = {
            result: 'ok',
            method: 'GET',
            payload
        }
        return data;
    }

    postTestData (payload) {
        try {
            const data = {
                result: 'ok',
                method: 'POST',
                payload
            }
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = new SkeletonService();