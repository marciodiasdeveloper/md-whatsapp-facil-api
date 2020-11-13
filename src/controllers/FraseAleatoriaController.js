const FraseAleatoria = require("../services/xxx/anota");

module.exports = {
    async index(request, response, next) {
        let result = FraseAleatoria.responder('teste');
        response.json(result);
    }
};