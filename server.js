const express = require("express");
require("dotenv").config();

const employeeRoute = require("./backend/routes/employeeRoute");
const {
  errorHandler,
  notFound,
} = require("./backend/middleware/errorMiddleware");
const {
  createEmployeeTable,
  deleteEmployeeTable,
} = require("./backend/utility/createTable");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// createEmployeeTable();
// deleteEmployeeTable();
app.use("/", employeeRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
