const fs = require('fs');
const path = require('path');

module.exports = class FraseAleatoria {

    static async responder(sessionName) {

        FraseAleatoria.data = FraseAleatoria.data || [];
       
        fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/frases.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            FraseAleatoria.data = rawData.split('\n');
        });

        return FraseAleatoria.data[FraseAleatoria.randomInt(0, FraseAleatoria.data.length)];
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}