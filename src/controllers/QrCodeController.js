const SessionService = require("../services/SessionService");

module.exports = {
    async create(request, response, next) {
        console.log("qrcode..." + request.query.sessionName);

        let session = SessionService.getSession(request.query.sessionName);
    
        if (session != false) {

            if (session.status != 'isLogged') {
                if (request.query.image) {
                    session.qrcode = session.qrcode.replace('data:image/png;base64,', '');
                    const imageBuffer = Buffer.from(session.qrcode, 'base64');
                    response.writeHead(200, {
                        'Content-Type': 'image/png',
                        'Content-Length': imageBuffer.length
                    });
                    response.end(imageBuffer);
                } else {
                    response.status(200).json({ result: "success", message: session.state, qrcode: session.qrcode });
                }
            } else {
                response.status(200).json({ result: "error", message: session.state });
            }
        } else {
            response.status(200).json({ result: "error", message: "NOTFOUND" });
        }

    }
};