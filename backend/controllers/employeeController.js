const asyncHandler = require("express-async-handler");

const postgres = require("../db/get-client");

//Adding a new Employee
exports.addEmployee = asyncHandler(async (req, res, next) => {
  const { name, lastName, city } = req.body;
  if (!name || !lastName || !city) {
    return res.status(400).json({
      success: false,
      message: `name, lastName, city required`,
    });
  }
  const query = `INSERT INTO employee(name,last_name,city) VALUES ('${name}', '${lastName}','${city}') RETURNING id,name,last_name,city`;
  const insertedRow = await postgres.query(query);
  res.status(201).json({ data: insertedRow.rows[0], success: true });
});

//Deleting an Employee
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Number(id) == NaN) {
    return res.status(400).json({
      success: false,
      message: `invalid id`,
    });
  }
  const query = `DELETE FROM employee  WHERE id='${id}' RETURNING id,name,last_name,city`;
  const deleteRow = await postgres.query(query);
  if (!deleteRow.rows[0]) {
    return res.json({
      message: `There Is No Row With ID :  ${id}`,
      success: false,
    });
  }
  res.json({ data: deleteRow.rows[0], success: true });
});

//Updating an Employee with multiple column values
exports.updateEmployee = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, last_name, city } = req.body;
  if (!Number(id) && Number(id) !== 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid Id`,
    });
  }

  if (!name && !last_name && !city) {
    return res.status(400).json({
      success: false,
      message: "Within name, last_name, city At list One Parameter is required",
    });
  }

  const obj = { name, last_name, city };
  let updatingValuesString = "";
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (obj[key] !== undefined) {
        updatingValuesString = `${updatingValuesString} ${
          updatingValuesString && ","
        } ${key} = '${obj[key]}'`;
      }
    }
  }

  const query = `UPDATE employee SET ${updatingValuesString} WHERE id =${id} RETURNING id,name,last_name,city`;

  const updatedRow = await postgres.query(query);
  if (!updatedRow.rows[0]) {
    return res.json({
      message: `There Is No Row With ID :  ${id}`,
      success: true,
    });
  }
  res.json({ data: updatedRow.rows[0], success: true });
});

//Getting all Employee with Sorted ID
exports.getAllEmployee = asyncHandler(async (req, res, next) => {
  const query = "SELECT * FROM employee ORDER BY id ASC";

  const d = await postgres.query(query);

  res.json({ msg: "OK", data: d.rows });
});

exports.searchEmployees = asyncHandler(async (req, res, next) => {
  const { search } = req.params;
  if (!search) {
    return res
      .status(400)
      .json({ success: false, message: "search  is required" });
  }
  let idSearch = ``;
  if (Number(search) || Number(search) == 0) {
    idSearch = `OR id = ${search}`;
  }

  const query =
    `SELECT * FROM employee WHERE name ILIKE '%${search}%' OR city ILIKE '%${search}%' OR last_name ILIKE '%${search}%' ` +
    idSearch;

  const table = await postgres.query(query);
  res.json({ msg: "OK", data: table.rows });
});
