const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.PG_DATABASE + "?sslmode=require",
});

pool.connect((err) => {
  if (err) throw err;
  console.log("Connect to PostgreSQL successfully!");
});

module.exports = pool;
