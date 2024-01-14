require("dotenv").config();
const mysql = require("mysql");

const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "mgt_system",
});

module.exports = connectDB;
