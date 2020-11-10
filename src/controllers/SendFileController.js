const SessionService = require("../service/SessionService");

module.exports = {
    async create(request, response, next) {
        var result = await Sessions.sendFile(
            request.body.sessionName,
            request.body.number,
            request.body.base64Data,
            request.body.fileName,
            request.body.caption
        );
        response.json(result);
    }
};