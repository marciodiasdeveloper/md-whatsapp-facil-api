const GoogleTextToSpeechService = require("../services/GoogleTextToSpeechService");

module.exports = {
    async index(request, response, next) {
        let result = await GoogleTextToSpeechService.create('Olá Mundo, O Hugo é lindo demais, o lindão do papai!');
        response.json(result);
    }
};