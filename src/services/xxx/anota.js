const fs = require('fs');
const path = require('path');

module.exports = class Anota {

    static async responder(sessionName) {

        Anota.anotacoes = Anota.anotacoes || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/anotacoes.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            Anota.anotacoes = rawData.toString().split('\n');
        });

        let frase = Anota.anotacoes[Anota.randomInt(0, Anota.anotacoes.length)];
        
        console.log('frase', frase);

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}