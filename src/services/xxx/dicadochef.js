const fs = require('fs');
const path = require('path');

module.exports = class Dicadochef {

    static async responder(sessionName) {

        Dicadochef.dicasdochef = Dicadochef.dicasdochef || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/dicasdochef.txt', 'utf8', function(err, rawData) {
        // fs.readFile('/Users/marciodias/dev/stack/saas-marciodias/md-whatsapp-facil-api/src/services/xxx/storage/frases.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            Dicadochef.dicasdochef = rawData.toString().split('\n');
        });

        let frase = Dicadochef.dicasdochef[Dicadochef.randomInt(0, Dicadochef.dicasdochef.length)];
        

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