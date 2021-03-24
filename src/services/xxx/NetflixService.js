const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const SessionService = require("../SessionService");
// const formatRelative = require('date-fns/formatRelative')
require('dotenv/config');

module.exports = class NetflixService {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './netflix.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists netflix (name text, whatsapp_id text, netflix text)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async store(message, netflix) {
      const create_table = await NetflixService.createDatabase();
      try {
        const db = await sqlite.open({ filename: './netflix.sqlite', driver: sqlite3.Database });
        let db_netflix = await db.get('SELECT * FROM netflix WHERE whatsapp_id = ? AND netflix = ?', [message.sender.id, netflix]);
            
        if(!db_netflix) {
          await db.run('insert into netflix (name, whatsapp_id, netflix) values (?, ?, ?)', [message.sender.pushname, message.sender.id, netflix]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa indicação antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, sua indicação Netflix foi registrada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async show() {
      const create_table = await BomDiaService.createDatabase();
      try {
        const db = await sqlite.open({ filename: './netflix.sqlite', driver: sqlite3.Database });
        const result = await db.get('SELECT * FROM netflix ORDER BY RANDOM() LIMIT 1');        
        if(!result) {
          return "*Não encontrei indicações.*";
        }
        await db.close();
        let netflix = result.netflix + '. *By ' + result.name + '*';
        return netflix;
      } catch (error) {
        console.log(error);
      }

    }

}