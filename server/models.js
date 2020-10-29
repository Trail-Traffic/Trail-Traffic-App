const secret = require('../secrets.js');
const myURI = secret.postgres_uri;


const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');

const pool = new Pool({connectionString: URI})

module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  }
};