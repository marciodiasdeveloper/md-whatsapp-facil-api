const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const SessionService = require("../SessionService");
// const formatRelative = require('date-fns/formatRelative')
require('dotenv/config');

module.exports = class QuatroI20Service {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './quatroevinte.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists frases (name text, whatsapp_id text, frase text)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async store(message, frase) {
      const create_table = await QuatroI20Service.createDatabase();
      try {
        const db = await sqlite.open({ filename: './quatroevinte.sqlite', driver: sqlite3.Database });
        let db_frase = await db.get('SELECT * FROM frases WHERE whatsapp_id = ? AND frase = ?', [message.sender.id, frase]);
            
        if(!db_frase) {
          await db.run('insert into frases (name, whatsapp_id, frase) values (?, ?, ?)', [message.sender.pushname, message.sender.id, frase]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa frase antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, sua frase 4i20 foi registrada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async show() {
      const create_table = await QuatroI20Service.createDatabase();
      try {
        const db = await sqlite.open({ filename: './quatroevinte.sqlite', driver: sqlite3.Database });
        const result = await db.get('SELECT * FROM frases ORDER BY RANDOM() LIMIT 1');        
        if(!result) {
          return "*Não encontrei indicações.*";
        }
        await db.close();
        let frase = result.frase + '. *By ' + result.name + '*';
        return frase;
      } catch (error) {
        console.log(error);
      }

    }

}