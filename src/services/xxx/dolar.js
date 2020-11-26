const axios = require('axios');

module.exports = class DolarHoje {

    static async responder(message_param) {

        const result = await axios.get('https://economia.awesomeapi.com.br/json/USD')
        .then(function(response){
            return response.data;
        })
        .catch(function(error) {
            return error;
        });  

        let message = `*${message_param.sender.pushname} Veja a cotação do ${result[0].name} hoje* \n\n`;
        message +=  `Alto: *R$ ${result[0].high} * \n`;
        message +=  `Baixo: *R$ ${result[0].low} *`;

        return message;
    }

}