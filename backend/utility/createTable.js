const postgres = require("../db/get-client");

exports.createEmployeeTable = async () => {
  const sql =
    "CREATE TABLE employee (id SERIAL PRIMARY KEY,name VARCHAR(50) NOT NULL,city VARCHAR(50) NOT NULL,last_name VARCHAR(50))";
  try {
    const d = await postgres.query(sql);
  } catch (e) {
    console.log("Table Create Error:", e);
  }
};

exports.deleteEmployeeTable = async () => {
  const sql = "DROP TABLE IF EXISTS employee CASCADE;";
  try {
    const d = await postgres.query(sql);
    console.log("Employee Table Deleted ");
  } catch (e) {
    console.log("Table Create Error:", e);
  }
};
