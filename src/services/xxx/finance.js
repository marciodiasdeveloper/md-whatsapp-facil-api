const axios = require('axios');

module.exports = class Finance {

    static async responder(message_param, company) {

        const result = await axios.get('https://api.hgbrasil.com/finance/stock_price?key=abeaffd4&symbol=PETR4')
        .then(function(response){
            return response.data;
        })
        .catch(function(error) {
            return error;
        });  

        let company_result = result.results.PETR4;

        let message = `*${message_param.sender.pushname}*: Veja as informações da *${company_result.name}* hoje \n\n`;
        message +=  `Valor: R$ ${company_result.price} \n`;
        message +=  `Capitalização de Mercado: R$ ${company_result.market_cap} \n`;
        message +=  `Aberto: R$ ${company_result.market_time.open} \n`;
        message +=  `Fechado: R$ ${company_result.market_time.open} \n`;
        message +=  `Atualizado em: ${company_result.updated_at}`;

        return message;
    }

}