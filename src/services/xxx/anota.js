const fs = require('fs');
const path = require('path');

module.exports = class FraseAleatoria {

    static async responder(sessionName) {

        FraseAleatoria.data = FraseAleatoria.data || [];
       
        fs.readFile('./storage/frases.txt', 'utf8', function(err, rawData) {
            if(err) {
                return console.log(err);
            }
            FraseAleatoria.data = rawData.split('\n');
        });

        return data[FraseAleatoria.randomInt(0, data.length)];
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

}