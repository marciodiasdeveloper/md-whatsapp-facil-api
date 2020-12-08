const fs = require('fs');
const path = require('path');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');

module.exports = class Anota {

    static async addfrase(message, frase) {
        
    }

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

        if(!frase || frase === undefined) {
            frase = "*XAAMAAAAA* não consigo sair do bar para anotar, vou pedir o @perrou bola murcha!"
        }

        return String(frase).trim();
    }

    static randomInt(low,high) {
        return Math.floor(Math.random() * (high - low) + low);
    }

    static async responderAudio() {

        const projectId = 'xxx-bot-298002';
        const keyFilename = 'XXX-Bot-de999e53522d.json'
        
        // Creates a client
        const client = new textToSpeech.TextToSpeechClient({ projectId, keyFilename });
        
        async function quickStart() {
        // The text to synthesize
        const text = 'Olá Mundo, sou XXX BOT!';

        // Construct the request
        const request = {
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'pt-BR', ssmlGender: 'NEUTRAL'},
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
        };

        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);
        // Write the binary audio content to a local file
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(path.resolve(__dirname, 'storage', 'output.mp3'), response.audioContent, 'binary');
        console.log('Audio content written to file: output.mp3');
        }
        quickStart();

    }

}