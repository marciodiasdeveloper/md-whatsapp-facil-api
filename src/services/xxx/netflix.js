const fs = require('fs');
const path = require('path');

module.exports = class Netflix {

    static async responder(sessionName) {

        Netflix.data = Netflix.data || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/netflix.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            Netflix.data = rawData.toString().split('\n');
        });

        let frase = Netflix.data[Netflix.randomInt(0, Netflix.data.length)];
        

        if(!frase || frase === undefined) {
            frase = "*XAAMAAAAA* sai da TV e vá VIVER!"
        }

        console.log('frase', frase);

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}