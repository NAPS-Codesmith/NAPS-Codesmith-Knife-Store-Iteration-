// backend
// create pool allowing use of queries to access db
const { Pool } = require('pg');
const PG_URI =
  'postgres://frlmcury:3DkMpbS9HD9Op-VKVsUKnJicX0qAuVFZ@heffalump.db.elephantsql.com/frlmcury';

// initate new pool
const pool = new Pool({
  connectionString: PG_URI,
});

//export pool
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
