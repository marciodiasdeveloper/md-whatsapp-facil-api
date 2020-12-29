const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const SessionService = require("../SessionService");
// const formatRelative = require('date-fns/formatRelative')
require('dotenv/config');

module.exports = class BomDiaService {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './bomdia.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists frases (name text, whatsapp_id text, frase text, hits integer)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async store(message, frase) {
      const create_table = await BomDiaService.createDatabase();

      try {

        const db = await sqlite.open({ filename: './bomdia.sqlite', driver: sqlite3.Database });

        let db_frase = await db.get('SELECT * FROM frases WHERE whatsapp_id = ? AND frase = ?', [message.sender.id, frase]);
            
        if(!db_frase) {
          await db.run('insert into frases (name, whatsapp_id, frase, hits) values (?, ?, ?, ?)', [message.sender.pushname, message.sender.id, frase, 0]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa frase antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, frase de bom dia adicionada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async show(sessionName) {

      const create_table = await BomDiaService.createDatabase();

      let session = await SessionService.getSession(sessionName);
    
      if (session != false) {

        try {
          const db = await sqlite.open({ filename: './bomdia.sqlite', driver: sqlite3.Database });
          
          const result = await db.get('SELECT * FROM frases ORDER BY RANDOM() LIMIT 1');
  
          console.log('result', result);
          
          if(!result) {
            return await session.sendText(sessionName, '553784171388-1520966397@g.us', "*não vou dar bom dia para ninguém hoje*, vou pedir o @perrou bola murcha!");
          }
  
          await db.close();
  
          let frase = result.frase + '. *By ' + result.name + '*';
  
          return await session.sendText(sessionName, '553784171388-1520966397@g.us', frase);
  
        } catch (error) {
          console.log(error);
        }

      } else {
          return false;
      }

    }

}