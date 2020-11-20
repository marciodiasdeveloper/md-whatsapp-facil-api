const fs = require('fs');
const path = require('path');

module.exports = class Spotify {

    static async responder(sessionName) {

        Spotify.data = Spotify.data || [];
       
        await fs.readFile('/var/www/www.api.marciodias.me/md-whatsapp-facil-api/src/services/xxx/storage/spotify.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            Spotify.data = rawData.toString().split('\n');
        });

        let frase = Spotify.data[Spotify.randomInt(0, Spotify.data.length)];
        
        if(!frase || !frase === undefined) {
            frase = Spotify.data[Spotify.randomInt(0, Spotify.data.length)];
        }

        console.log('frase', frase);

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}