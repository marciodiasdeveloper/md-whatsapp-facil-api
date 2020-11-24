const fs = require('fs');
const path = require('path');

module.exports = class DiasDeTruta {

    static async responder(message_from) {

        DiasDeTruta.ddt = DiasDeTruta.ddt || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/ddt.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            DiasDeTruta.ddt = rawData.toString().split('\n');
        });

        let frase = DiasDeTruta.ddt[DiasDeTruta.randomInt(0, DiasDeTruta.ddt.length)];
        
        if(!frase || frase === undefined) {
            frase = "*XAAMAAAAA* eu não vou responder Whatsapp, estou no boteco!"
        }

        console.log('frase', frase);


        return String(frase).trim();
    }
    
  
    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}