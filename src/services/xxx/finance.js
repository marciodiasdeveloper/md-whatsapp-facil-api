const axios = require('axios');

module.exports = class Finance {

    static async responder(message_param, company) {

        const result = await axios.get('https://api.hgbrasil.com/finance/stock_price?key=abeaffd4&symbol='+company)
        .then(function(response){
            return response.data;
        })
        .catch(function(error) {
            return error;
        });  

        let company_result = result.results[company];

        let message = `*${message_param.sender.pushname}*: Veja as informações da *${company_result.name}* hoje \n\n`;
        message +=  `Valor: R$ ${company_result.price} \n`;
        message +=  `Capitalização de Mercado: R$ ${company_result.market_cap} \n`;
        message +=  `Aberto: ${company_result.market_time.open} \n`;
        message +=  `Fechado: ${company_result.market_time.close} \n`;
        message +=  `Atualizado em: ${company_result.updated_at}`;

        return message;
    }

}