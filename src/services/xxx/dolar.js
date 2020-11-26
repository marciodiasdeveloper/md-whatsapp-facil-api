const axios = require('axios');

module.exports = class DolarHoje {

    static async responder(message_from) {

        const result = await axios.get('https://economia.awesomeapi.com.br/json/USD')
        .then(function(response){
            return response;
          console.log(response.data); // ex.: { user: 'Your User'}
          console.log(response.status); // ex.: 200
        });  

        let message = 'Cotação do ' + result.name +' high: ' + result.high + ' low: R$ '.result.low;

        return message;
    }

}