const QuatroI20Service = require("../services/xxx/QuatroI20Service");
const SessionService = require("../services/SessionService");

module.exports = {
    async index(request, response, next) {
        let frase = await QuatroI20Service.show();
        let result = await SessionService.sendTextGroup(
            request.query.sessionName,
            '553784171388-1520966397@g.us',
            frase
        );
        response.status(200).json({ result: 'success', data: result });
    }
};