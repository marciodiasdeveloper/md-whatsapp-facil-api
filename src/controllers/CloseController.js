const SessionService = require("../service/SessionService");

module.exports = {
    async create(request, response, next) {
        let result = await SessionService.closeSession(request.query.sessionName);
        response.json(result);
    }
};