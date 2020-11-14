const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

require('dotenv/config');

module.exports = class Sqlite {

    static async createDatabase(session) {

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
            await db.run(`create table if not exists xxxbot (id integer primary key, name text, whatsapp_id text, hits integer)`);
        
            // await db.run('insert into people (name) values (?)', ['Gabriel']);
        
            // const rows = await db.all('select * from people');
            // console.log(rows);
        
            await db.close();
          } catch (error) {
            console.log(error);
          }
    }

}