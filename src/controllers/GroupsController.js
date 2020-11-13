const SessionService = require("../services/SessionService");


module.exports = {
    async index(request, response, next) {

        let session = await SessionService.getSession(request.query.sessionName);
    
        if (session != false) {

            let groups = await SessionService.getAllGroups(request.query.sessionName);

            console.log('getAllGroups', groups);

            response.status(200).json({ result: "success", data: groups });  

        } else {
            response.status(200).json({ result: "error", message: "NOTFOUND" });
        }
    }
};