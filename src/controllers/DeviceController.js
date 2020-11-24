const SessionService = require("../services/SessionService");

module.exports = {
    async index(request, response, next) {
      let result = await SessionService.device(request.query.sessionName);
      
      if(result.result === 'success') {
        response.json(result);
      } else {
        response.json({ result: "error", message: 'not_valid' });
      }
    },
};