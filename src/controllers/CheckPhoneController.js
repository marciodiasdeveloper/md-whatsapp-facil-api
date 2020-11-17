const SessionService = require("../services/SessionService");

module.exports = {
    async index(request, response, next) {
      let result = await SessionService.checkPhone(request.query.sessionName, request.query.phone);
      response.json(result);
    },
};