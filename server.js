const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const expressvalidator = require("express-validator");
const app = express();

const policyRoute = require("./routes/policyRoute.js");

const logger = require("./logger/logger.js");
require("dotenv").config();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use(expressvalidator());
app.use("/", policyRoute);
mongoose.Promise = global.Promise;
app.use(function (err, req, res, next) {
  var error = {
    status: false,
    status_code: 500,
    message:
      "Something bad happened. Please contact system administrator or try again",
  };
  res.send(error);
});
mongoose
  .connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.log("info", "Connected to the Database Successfully");
    app.listen(process.env.PORT, () => {
      logger.log("info", "server is listening on port 3000");
    });
  })
  .catch((err) => {
    logger.log("info", "Not connected to the database ", err);
    process.exit();
  });
module.exports = app;
