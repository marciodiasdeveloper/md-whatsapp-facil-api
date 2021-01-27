const fs = require('fs');
const path = require('path');

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

require('dotenv/config');

module.exports = class AnotaService {

    static async createDatabase() {
        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists votes (name text, whatsapp_id text, hits integer)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }


    static async createDatabaseFrases() {
        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            await db.run(`create table if not exists frases (name text, whatsapp_id text, frase text, hits integer)`);        
            await db.close();
        } catch (error) {
          console.log(error);
        }
    }

    static async registerVote(message) {

        // console.log('register vote date',formatRelative(new Date(), new Date()));

        const create_table = await AnotaService.createDatabase();

        try {
            const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
            
            let votes = await db.get('SELECT * FROM votes WHERE whatsapp_id = ?', [message.sender.id]);
            
            if(!votes) {
              await db.run('insert into votes (name, whatsapp_id, hits) values (?, ?, ?)', [message.sender.pushname, message.sender.id, 0]);
              let whatsapp_id = await db.get('SELECT * FROM votes WHERE whatsapp_id = ?', [message.sender.id]);
            } 

            let votes_hits = (votes.hits+1);

            if(!votes_hits) {
              votes_hits = 1;
            }
            
            const result = await db.run('UPDATE votes SET hits = ? WHERE whatsapp_id = ?', votes_hits, votes.whatsapp_id);
            await db.close();

            console.log('retorna resposta do voto registrado', result);

            return votes_hits;
          } catch (error) {
            console.log(error);
          }
    }


    static async getRanking(message) {

      const create_table = await AnotaService.createDatabase();

      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
        const result = await db.all('SELECT * FROM votes ORDER BY hits DESC');
        
        await db.close();

        return result;
      } catch (error) {
        console.log(error);
      }

    }

    static async addFrase(message, frase) {
      const create_table = await AnotaService.createDatabaseFrases();

      try {

        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });

        let db_frase = await db.get('SELECT * FROM frases WHERE whatsapp_id = ? AND frase = ?', [message.sender.id, frase]);
            
        if(!db_frase) {
          await db.run('insert into frases (name, whatsapp_id, frase, hits) values (?, ?, ?, ?)', [message.sender.pushname, message.sender.id, frase, 0]);
        } else {
          return '*'+message.sender.pushname+'* você já adicionou essa frase antes.';
        }
        await db.close();
        return '*'+message.sender.pushname+'*, frase adicionada!';
      } catch (error) {
        console.log(error);
      }
    }

    static async showFrase() {

      const create_table = await AnotaService.createDatabase();

      try {
        const db = await sqlite.open({ filename: './database.sqlite', driver: sqlite3.Database });
        
        const result = await db.get('SELECT * FROM frases ORDER BY RANDOM() LIMIT 1');

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