//
const {Client}  = require('pg');

async function getConnection(){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'destoredUser',
    password: 'destored123',
    database: 'DB_Destored'
  });
await client.connect();
return client;
}

module.exports = getConnection;
