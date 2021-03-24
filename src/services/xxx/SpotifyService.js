const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const SessionService = require("../SessionService");
// const formatRelative = require('date-fns/formatRelative')
require('dotenv/config');

module.exports = class SpotifyService {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './spotify.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists spotify (name text, whatsapp_id text, spotify text)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async store(message, spotify) {
      const create_table = await SpotifyService.createDatabase();
      try {
        const db = await sqlite.open({ filename: './spotify.sqlite', driver: sqlite3.Database });
        let db_spotify = await db.get('SELECT * FROM spotify WHERE whatsapp_id = ? AND spotify = ?', [message.sender.id, spotify]);
            
        if(!db_spotify) {
          await db.run('insert into spotify (name, whatsapp_id, spotify) values (?, ?, ?)', [message.sender.pushname, message.sender.id, spotify]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa indicação antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, sua indicação spotify foi registrada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async show() {
      const create_table = await SpotifyService.createDatabase();
      try {
        const db = await sqlite.open({ filename: './spotify.sqlite', driver: sqlite3.Database });
        const result = await db.get('SELECT * FROM spotify ORDER BY RANDOM() LIMIT 1');        
        if(!result) {
          return "*Não encontrei indicações.*";
        }
        await db.close();
        let spotify = result.spotify + '. *By ' + result.name + '*';
        return spotify;
      } catch (error) {
        console.log(error);
      }

    }

}