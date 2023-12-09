const express = require("express");
require("dotenv").config();
const path = require("path");

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

app.use("/", employeeRoute);
app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "build", "index.html"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
