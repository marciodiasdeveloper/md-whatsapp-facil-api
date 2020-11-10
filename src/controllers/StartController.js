const SessionService = require("../service/SessionService");

module.exports = {
    async create(request, response, next) {
        console.log("starting..." + request.query.sessionName);
        let session = await SessionService.start(request.query.sessionName);
    
        if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
            response.status(200).json({ result: 'success', message: session.state });
        } else {
            response.status(200).json({ result: 'error', message: session.state });
        }
    }
};