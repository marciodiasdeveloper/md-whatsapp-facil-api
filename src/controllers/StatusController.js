const Sessions = require("../service/Sessions");

module.exports = {
    async create(request, response, next) {
        console.log("starting info session..." + req.query.sessionName);
        var session = await Sessions.getSession(req.query.sessionName);
    
        console.log('session', session);
    
        if (session != false) {
            res.status(200).json({ state: session.state });  
        } else {
            res.status(200).json({ result: "error", message: "NOTFOUND" });
        }
    }
};