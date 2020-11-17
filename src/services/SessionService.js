const os = require('os');
const fs = require('fs');
const path = require('path');
const venom = require('venom-bot');
const { Session } = require('inspector');

const WebhookService = require("./WebhookService");
const SqliteService = require("./SqliteService");

const FraseAleatoria = require ("./xxx/anota");

// const { Session } = require('inspector');
// const { info } = require('console');

module.exports = class Sessions {

    static async start(sessionName) {
        Sessions.sessions = Sessions.sessions || []; //start array

        let session = Sessions.getSession(sessionName);

        if (session == false) { //create new session
            
            console.log("session == false");
            session = await Sessions.addSesssion(sessionName);

        } else if (["CLOSED"].includes(session.state)) { //restart session
            
            console.log("session.state == CLOSED");
            session.state = "STARTING";
            session.status = 'notLogged';
            session.client = Sessions.initSession(sessionName);

            Sessions.setup(sessionName);
        
        } else if (["CONFLICT", "UNPAIRED", "UNLAUNCHED"].includes(session.state)) {

            console.log("client.useHere()");
            session.client.then(client => {
                client.useHere();
            });

        } else {
            console.log("session.state: " + session.state);
        }

        return session;
    }//start

    static async addSesssion(sessionName) {
        let newSession = {
            name: sessionName,
            qrcode: false,
            client: false,
            status: 'notLogged',
            state: 'STARTING'
        }
        Sessions.sessions.push(newSession);
        console.log("newSession.state: " + newSession.state);

        //setup session
        newSession.client = Sessions.initSession(sessionName);
        Sessions.setup(sessionName);

        return newSession;
    }//addSession

    static async initSession(sessionName) {
        let session = Sessions.getSession(sessionName);
        const client = await venom.create(
            sessionName,
            (base64Qr) => {
                session.state = "QRCODE";
                session.qrcode = base64Qr;
                console.log("new qrcode updated - session.state: " + session.state);
                WebhookService.notifyApiSessionUpdate(session);
            },
            (statusFind) => {
                console.log('statusFind', statusFind);
                session.status = statusFind;
                console.log("session.status: " + session.status);
                WebhookService.notifyApiSessionUpdate(session);
            },
            {
                headless: true,
                devtools: false,
                useChrome: false,
                debug: false,
                logQR: false,
                browserArgs: [
                    '--log-level=3',
                    '--no-default-browser-check',
                    '--disable-site-isolation-trials',
                    '--no-experiments',
                    '--ignore-gpu-blacklist',
                    '--ignore-certificate-errors',
                    '--ignore-certificate-errors-spki-list',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-default-apps',
                    '--enable-features=NetworkService',
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    // Extras
                    '--disable-webgl',
                    '--disable-threaded-animation',
                    '--disable-threaded-scrolling',
                    '--disable-in-process-stack-traces',
                    '--disable-histogram-customizer',
                    '--disable-gl-extensions',
                    '--disable-composited-antialiasing',
                    '--disable-canvas-aa',
                    '--disable-3d-apis',
                    '--disable-accelerated-2d-canvas',
                    '--disable-accelerated-jpeg-decoding',
                    '--disable-accelerated-mjpeg-decode',
                    '--disable-app-list-dismiss-on-blur',
                    '--disable-accelerated-video-decode',
                ],
                refreshQR: 15000,
                autoClose: 60 * 60 * 24 * 365, //never
                disableSpins: true
            }
        );
        return client;
    }//initSession

    static async setup(sessionName) {
        let session = Sessions.getSession(sessionName);
        await session.client.then(client => {

            client.onStateChange(state => {
                session.state = state;
                WebhookService.notifyApiSessionUpdate(session);
                console.log("session.state: " + state);
            });//.then((client) => Sessions.startProcess(client));

            client.onMessage(async (message) => {

                console.log('received message');

                try {
                    if (message.body === 'hi') {
                        client.sendText(message.from, 'Hello\nfriend!');
                    } else if (message.body == '!comandos' && message.chat.id === '553784171388-1520966397@g.us') {

                        let text = `_*Olá, sou XXX BOT, confira a lista de comandos ativos*_\n\n`;
                        text += `*!anota+1* => Registrar as anotações diárias. \n`;
                        text += `*!ranking* => Ranking das anotações XXX diárias. \n`;
                        text += `*!fraseXXX* => Ação para visualizar uma frase aleatória. \n`;
                        text += `*!spotify* => Precisa de uma lista de músicas para ouvir no Spotify? \n`;
                        text += `*!dicadochef* => by Dudu Jaber? \n`;

                        client.sendText(message.from, text);

                    }  else if (message.body == '!ranking' && message.chat.id === '553784171388-1520966397@g.us') {
                        
                        
                        let text = `_*Olá, sou XXX BOT, confira a o ranking de anotações*_\n\n`;
                        text += `---------------------------------------------- \n`;

                        let votes = await SqliteService.getRanking(message);

                        console.log('votes', votes);

                        if(votes) {
                            votes.forEach(function(vote, i) {
                                text += `${i} - ${vote.name} (${vote.hits} registros)\n`;
                            });
                        } else {
                            text += `Sem resultados. \n`;
                        }


                        client.sendText(message.from, text);

                    } else if (message.body == '!anota+1' && message.chat.id === '553784171388-1520966397@g.us') {
                        
                        await SqliteService.registerVote(message);
                        
                        console.log('message from:', message);
                        let msg = await FraseAleatoria.anota(message.from);
                        let phone_from = String(message.from).replace('@g.us', '').replace('@c.us', '');
                        client.sendText(message.from, '*'+message.sender.pushname+'*, '+msg.toString());
                    } else if (message.body == '!fraseXXX' && message.chat.id === '553784171388-1520966397@g.us') {
                        console.log('message from:', message.from);
                        let msg = await FraseAleatoria.responder(message.from);
                        client.sendText(message.from, msg.toString());
                    } else if (message.body == '!dicadochef' && message.chat.id === '553784171388-1520966397@g.us') {
                        console.log('message from:', message);
                        let msg = await FraseAleatoria.dicadochef(message.from);
                        // let phone_from = String(message.from).replace('@g.us', '').replace('@c.us', '');
                        client.sendText(message.from, msg.toString());
                    } else if (message.body == '!spotify' && message.chat.id === '553784171388-1520966397@g.us') {
                        let msg = '💥 Estou preparando uma lista de playlists do Spotify para dividir com vocês!';
                        client.sendText(message.from, msg);


                    } else if (message.body == '!ping') {
                      client.sendText(message.from, 'pong');
                    } else if (message.body == '!ping reply') {
                      client.reply(message.from, 'pong', message.id.toString());
                    } else if (message.body == '!chats') {
                      const chats = await client.getAllChats();
                      client.sendText(message.from, `The bot has ${chats.length} chats open.`);
                    } else if (message.body == '!groups') {
                      const groups = await client.getAllGroups();
                      client.sendText(message.from, `The bot has ${groups.length} groups open.`);
                    }
                    // } else if (message.body == '!info') {
                    //   let info = await client.getHostDevice();
                    //   let message = `_*Connection info*_\n\n`;
                    //   message += `*User name:* ${info.pushname}\n`;
                    //   message += `*Number:* ${info.wid.user}\n`;
                    //   message += `*Battery:* ${info.battery}\n`;
                    //   message += `*Plugged:* ${info.plugged}\n`;
                    //   message += `*Device Manufacturer:* ${info.phone.device_manufacturer}\n`;
                    //   message += `*WhatsApp version:* ${info.phone.wa_version}\n`;
                    //   client.sendText(message.from, message);
                    // } else if (message.body.startsWith('!sendto ')) {
                    //   // Direct send a new message to specific id
                    //   let number = message.body.split(' ')[1];
                    //   let messageIndex = message.body.indexOf(number) + number.length;
                    //   let message = message.body.slice(messageIndex, message.body.length);
                    //   number = number.includes('@c.us') ? number : `${number}@c.us`;
                    //   client.sendText(number, message);
                    // } else if (message.body.startsWith('!pin ')) {
                    //   let option = message.body.split(' ')[1];
                    //   if (option == 'true') {
                    //     await client.pinChat(message.from, true);
                    //   } else {
                    //     await client.pinChat(message.from, false);
                    //   }
                    // } else if (message.body.startsWith('!typing ')) {
                    //   const option = message.body.split(' ')[1];
                    //   if (option == 'true') {
                    //     // Start typing...
                    //     await client.startTyping(message.from);
                    //   } else {
                    //     // Stop typing
                    //     await client.stopTyping(message.from);
                    //   }
                    // } else if (message.body.startsWith('!ChatState ')) {
                    //   const option = message.body.split(' ')[1];
                    //   if (option == '1') {
                    //     await client.setChatState(message.from, '0');
                    //   } else if (option == '2') {
                    //     await client.setChatState(message.from, '1');
                    //   } else {
                    //     await client.setChatState(message.from, '2');
                    //   }
                    // }
                } catch (e) {
                    console.log(e);
                }
    
            });

            client.onAck(ack => {
                console.log("ack: " + ack);
            });

        });
    }//setup

    static async closeSession(sessionName) {
        let session = Sessions.getSession(sessionName);
        if (session) { //só adiciona se não existir
            WebhookService.notifyApiSessionUpdate(session);
            if (session.state != "CLOSED") {
                if (session.client)
                    await session.client.then(async client => {
                        try {
                            await client.close();
                        } catch (error) {
                            console.log("client.close(): " + error.message);
                        }
                        session.state = "CLOSED";
                        session.client = false;
                        WebhookService.notifyApiSessionUpdate(session);
                        console.log("client.close - session.state: " + session.state);
                    });
                    WebhookService.notifyApiSessionUpdate(session);
                return { result: "success", message: "CLOSED" };
            } else {//close
                WebhookService.notifyApiSessionUpdate(session);
                return { result: "success", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//close

    static getSession(sessionName) {
        let foundSession = false;
        if (Sessions.sessions)
            Sessions.sessions.forEach(session => {
                if (sessionName == session.name) {
                    foundSession = session;
                }
            });
        return foundSession;
    }//getSession

    static getSessions() {
        if (Sessions.sessions) {
            return Sessions.sessions;
        } else {
            return [];
        }
    }//getSessions

    static async getQrcode(sessionName) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            // if (["UNPAIRED", "UNPAIRED_IDLE"].includes(session.state)) {
            if (["UNPAIRED_IDLE"].includes(session.state)) {
                //restart session
                await Sessions.closeSession(sessionName);
                Sessions.start(sessionName);
                WebhookService.notifyApiSessionUpdate(session);

                return { result: "error", message: session.state };
            } else if (["CLOSED"].includes(session.state)) {
                Sessions.start(sessionName);
                WebhookService.notifyApiSessionUpdate(session);
                return { result: "error", message: session.state };
            } else { //CONNECTED
                if (session.status != 'isLogged') {
                    WebhookService.notifyApiSessionUpdate(session);
                    return { result: "success", message: session.state, qrcode: session.qrcode };
                } else {
                    WebhookService.notifyApiSessionUpdate(session);
                    return { result: "success", message: session.state };
                }
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    } //getQrcode

    static async sendText(sessionName, number, text) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            WebhookService.notifyApiSessionUpdate(session);
            if (session.state == "CONNECTED") {
                let resultSendText = await session.client.then(async client => {

                    let phone_validation = await client.getNumberProfile('55'+number+'@c.us');
                    
                    if(phone_validation && phone_validation.numberExists) {
                        return await client
                        .sendText(phone_validation.id._serialized, text)
                        .then((result) => {
                            WebhookService.notifyApiSessionUpdate(session);
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                    } else {
                        return await client
                        .sendText('55'+number + '@c.us', text)
                        .then((result) => {
                            WebhookService.notifyApiSessionUpdate(session);
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                    }
  
                })
                .catch(error => console.log('error', error));
                return { result: "success", data: resultSendText };
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//message

    static async sendFile(sessionName, number, base64Data, fileName, caption) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            WebhookService.notifyApiSessionUpdate(session);
            if (session.state == "CONNECTED") {
                let resultSendFile = await session.client.then(async (client) => {
                    let folderName = fs.mkdtempSync(path.join(os.tmpdir(), session.name + '-'));
                    let filePath = path.join(folderName, fileName);
                    fs.writeFileSync(filePath, base64Data, 'base64');
                    console.log(filePath);
                    return await client.sendFile(number + '@c.us', filePath, fileName, caption);
                });//client.then(
                return { result: "success" };
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }//message

    static async sendLinkPreview(sessionName, link, title) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            WebhookService.notifyApiSessionUpdate(session);
            if (session.state == "CONNECTED") {
                let resultSendLinkPreview = await session.client.then(async client => {
                    return await client
                    .sendLinkPreview(number + '@c.us', link, title)
                    .then((result) => {
                      WebhookService.notifyApiSessionUpdate(session);
                      console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                      console.error('Error when sending: ', erro); //return object error
                    });
                })
                .catch(error => console.log('error', error));
                return { result: "success", data: resultSendLinkPreview };
            } else {
                return { result: "error", message: session.state };
            }
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static async getAllGroups(sessionName) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            let groups = await session.client.then(async (client) => {
                return await client.getAllGroups();
            });

            return groups;
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }

    static async checkPhone(sessionName, phone) {
        let session = Sessions.getSession(sessionName);
        if (session) {
            let phone_validator = await session.client.then(async (client) => {
                let verify = await client.getNumberProfile('55'+phone+'@c.us');
                console.log('verify', verify);
                return verify;
            });

            console.log('phone_validator', phone_validator);

            if(phone_validator && phone_validator.numberExists) {
                return true;
            } else {
                return false;
            }

            return groups;
        } else {
            return { result: "error", message: "NOTFOUND" };
        }
    }
}