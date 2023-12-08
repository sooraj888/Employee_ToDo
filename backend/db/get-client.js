const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://em_db_pg_user:KDw8IT9sady9omsDM6vuRAK6Ip0jwu9N@dpg-clpo3k146foc73dcnqdg-a.singapore-postgres.render.com/em_db_pg" +
    "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;
