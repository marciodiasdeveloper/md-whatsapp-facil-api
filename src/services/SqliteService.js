const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

require('dotenv/config');

module.exports = class SqliteService {

    static async createDatabase() {

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
            await db.run(`create table if not exists votes (id integer primary key autoincrement, name text, whatsapp_id text, hits integer)`);
        
            // await db.run('insert into people (name) values (?)', ['Gabriel']);
        
            // const rows = await db.all('select * from people');
            // console.log(rows);
        
            await db.close();
          } catch (error) {
            console.log(error);
          }
    }

    static async registerVote(message) {

        const create_table = await SqliteService.createDatabase();

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            
            // const rows = await db.all('select * from votes WHERE whatsapp_id = ${message.sends.id}');
            let votes = await db.get('SELECT * FROM votes WHERE votes = ?', [message.sender.id]);
            
            if(!votes) {
              await db.run('insert into votes (name, whatsapp_id, hits) values (?, ?, ?)', [message.sender.pushname, message.sender.id, 0]);
              whatsapp_id = await db.get('SELECT * FROM votes WHERE whatsapp_id = ?', [message.sender.id]);
            } 

            console.log('vote hits old:', votes.hits);
            console.log('vote hits new:', votes.hits++);
            
            const result = await db.run('UPDATE votes SET hits = ? WHERE whatsapp_id = ?', votes.hits++, votes.whatsapp_id);
            await db.close();

            return result;
          } catch (error) {
            console.log(error);
          }
    }


    static async getRanking(message) {

      const create_table = await SqliteService.createDatabase();

      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
        const result = await db.all('SELECT * FROM votes ORDER BY hits DESC');
        
        await db.close();

        return result;
      } catch (error) {
        console.log(error);
      }

    }

}