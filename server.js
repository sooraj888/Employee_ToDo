const path = require("path");
const express = require("express");
require("dotenv").config();
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname, "build"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "build")));

const employeeRoute = require("./backend/routes/employeeRoute");
const {
  errorHandler,
  notFound,
} = require("./backend/middleware/errorMiddleware");
const {
  createEmployeeTable,
  deleteEmployeeTable,
} = require("./backend/utility/createTable");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/", employeeRoute);
app.get("/*", function (req, res) {
  res.render(path.join(__dirname, "build"));
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
