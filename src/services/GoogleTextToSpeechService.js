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

        const filename = uuidv4();

        await writeFile(path.resolve('storage', filename + '.mp3'), response.audioContent, 'binary');
            console.log('Audio content written to file: output.mp3');
        }
        quickStart();

        return path.resolve('storage', filename + '.mp3');
    }

}