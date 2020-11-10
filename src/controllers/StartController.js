const Sessions = require("../service/Sessions");

module.exports = {
    async create(request, response, next) {
        console.log("starting..." + req.query.sessionName);
        var session = await Sessions.start(req.query.sessionName);
    
        if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
            response.status(200).json({ result: 'success', message: session.state });
        } else {
            response.status(200).json({ result: 'error', message: session.state });
        }
    }
};