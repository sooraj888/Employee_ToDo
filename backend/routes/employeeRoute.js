const express = require("express");
const {
  addEmployee,
  updateEmployee,
  getAllEmployee,
  deleteEmployee,
  searchEmployees,
} = require("../controllers/employeeController");
const router = express.Router();

router.route("/allEmployees").get(getAllEmployee);
router.route("/searchEmployees/:search").post(searchEmployees);
router.route("/employee").post(addEmployee);
router.route("/employee/:id").patch(updateEmployee).delete(deleteEmployee);

module.exports = router;
