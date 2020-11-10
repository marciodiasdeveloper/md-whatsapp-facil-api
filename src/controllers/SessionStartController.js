const Sessions = require("./service/Sessions");

module.exports = {
    async create(req, res, next) {
        console.log("starting..." + req.query.sessionName);
        var session = await Sessions.start(req.query.sessionName);
    
        if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
            res.status(200).json({ result: 'success', message: session.state });
        } else {
            res.status(200).json({ result: 'error', message: session.state });
        }
    }
};