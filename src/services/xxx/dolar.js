const axios = require('axios');

module.exports = class DolarHoje {

    static async responder(message_from) {

        const result = await axios.get('https://economia.awesomeapi.com.br/json/USD')
        .then(function(response){
            return response;
          console.log(response.data); // ex.: { user: 'Your User'}
          console.log(response.status); // ex.: 200
        });  

        let message = 'Cotação do ' + result[0].name +' high: R$ ' + result[0].high + ' low: R$ ' + result[0].low;

        return message;
    }

}