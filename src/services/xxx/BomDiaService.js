const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
// const formatRelative = require('date-fns/formatRelative')

require('dotenv/config');

module.exports = class BomDiaService {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists bomdia (name text, whatsapp_id text, frase text, hits integer)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async store(message, frase) {
      const create_table = await BomDiaService.createDatabase();

      try {

        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });

        let db_frase = await db.get('SELECT * FROM bomdias WHERE whatsapp_id = ? AND frase = ?', [message.sender.id, frase]);
            
        if(!db_frase) {
          await db.run('insert into bomdias (name, whatsapp_id, frase, hits) values (?, ?, ?, ?)', [message.sender.pushname, message.sender.id, frase, 0]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa frase antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, frase adicionada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async show(message) {

      const create_table = await BomDiaService.createDatabase();

      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
        const result = await db.get('SELECT * FROM bomdias ORDER BY RANDOM() LIMIT 1');

        console.log('result', result);
        
        if(!result) {
          return "*XAAMAAAAA* não consigo sair do bar para anotar, vou pedir o @perrou bola murcha!";
        }

        await db.close();

        let frase = result.frase + '. *By ' + result.name + '*';

        return frase;

      } catch (error) {
        console.log(error);
      }

    }

}