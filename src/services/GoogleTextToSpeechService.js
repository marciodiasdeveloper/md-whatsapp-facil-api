const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

module.exports = class GoogleTextToSpeechService {

    static async create(text) {
        const projectId = 'xxx-bot-298002';
        const keyFilename = 'XXX-Bot-de999e53522d.json';
        
        // Creates a client
        const client = new textToSpeech.TextToSpeechClient({ projectId, keyFilename });
        
        async function quickStart() {

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

            let filename = uuidv4() + '.mp3';
            let pathFile = path.resolve('storage', filename);

            const resultFinal = await writeFile(pathFile, response.audioContent, 'binary');
            console.log('Audio content written to file: '+pathFile);

            return {
                filename: filename,
                path: pathFile
            };
        }

        const result = quickStart();

        return result;
    }

}