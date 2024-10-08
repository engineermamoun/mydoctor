const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");
const db = require("./model/database");
const models = require("./model");

// import routes
const userRoute = require("./route/index");

const app = express();

// Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));  
app.use(bodyparser.json());  

// Route setup
app.use("/api", userRoute);

// Handling 404 errors
app.use((req, res, next) => {
  const err = new Error("ROUTE NOT FOUND ");
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

const port = process.env.PORT || 5000;

// Database synchronization and server start
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
  });
});
