const SessionService = require("../service/SessionService");

module.exports = {
    async create(request, response, next) {
        let result = await Sessions.sendText(
            request.body.sessionName,
            request.body.number,
            request.body.text
        );
        response.json(result);
    }
};