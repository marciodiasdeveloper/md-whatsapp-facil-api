const SessionService = require("../services/SessionService");

module.exports = {
    async index(request, response, next) {
      let result = await SessionService.checkPhone(request.query.sessionName, request.query.phone);
      
      if(result.result === 'success') {
        response.json(result);
      } else {
        response.json({ result: false, message: 'not_valid' });
      }
    },
};