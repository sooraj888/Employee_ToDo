const express = require("express");
const employeeRoute = require("./backend/routes/employeeRoute");
const {
  errorHandler,
  notFound,
} = require("./backend/middleware/errorMiddleware");
const { createEmployeeTable } = require("./backend/utility/createTable");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

// createEmployeeTable();

app.use("/", employeeRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
