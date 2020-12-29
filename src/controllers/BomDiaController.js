const BomDiaService = require("../services/xxx/BomDiaService");

module.exports = {
    async index(request, response, next) {
        let bomdia = await BomDiaService.show(request.query.sessionName);
        response.status(200).json({ result: 'success' });
    }
};