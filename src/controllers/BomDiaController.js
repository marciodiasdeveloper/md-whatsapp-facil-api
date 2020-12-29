const BomDiaService = require("../services/BomDiaService");

module.exports = {
    async index(request, response, next) {
        let bomdia = await BomDiaService.bomdia(request.query.sessionName);
        response.status(200).json({ result: 'success' });
    }
};