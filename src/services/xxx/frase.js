const fs = require('fs');
const path = require('path');

module.exports = class Frase {

    static async responder(sessionName) {

        Frase.data = Frase.data || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/frases.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            Frase.data = rawData.toString().split('\n');
        });

        let frase = Frase.data[Frase.randomInt(0, Frase.data.length)];
        

        if(!frase || frase === undefined) {
            frase = "*XAAMAAAAA* já penso em um FIAT UNO subindo para o litoral com Sandrão Karacol e Perrou?"
        }
        
        console.log('frase', frase);

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}