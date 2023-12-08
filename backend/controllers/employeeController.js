const asyncHandler = require("express-async-handler");

const postgres = require("../db/get-client");

exports.addEmployee = asyncHandler(async (req, res, next) => {
  const sql =
    "CREATE TABLE customers (id SERIAL PRIMARY KEY,name VARCHAR(50) NOT NULL,email VARCHAR(50) UNIQUE,phone VARCHAR(15))";

  const sqlIn =
    "INSERT INTO employee (name, last_name,city, phone) VALUES ('Alice', 'dd','sagar', '1234567890')";

  const d = await postgres.query(sqlIn);

  res.json({ msg: "OK", data: d });
});
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  res.send("deleteEmployee");
});
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  res.send("updateEmployee");
});
exports.getAllEmployee = asyncHandler(async (req, res, next) => {
  const sql = "SELECT * FROM employee";

  const d = await postgres.query(sql);

  res.json({ msg: "OK", data: d.rows });
});
exports.searchEmployees = asyncHandler(async (req, res, next) => {
  res.send("searchEmployee");
});
