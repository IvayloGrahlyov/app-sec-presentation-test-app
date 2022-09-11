require("dotenv").config();
const mysql = require('mysql');

const {
  MYSQL_USER = "root",
  MYSQL_HOST = "localhost",
  MYSQL_DATABASE = "presentation",
  MYSQL_PASSWORD = "password",
  MYSQL_PORT = 3306,
} = process.env;

const con = mysql.createConnection({
  user: MYSQL_USER,
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  connectTimeout: 60000,
});

con.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`, (err) => {
  if (err) console.log("MySQL: Could not create database", err);
  con.changeUser({
    database : MYSQL_DATABASE
}, (err) => {
    if (err) {
      console.log('Error in changing database', err);
      return;
    }
    con.query("DROP TABLE IF EXISTS Users", (err) => {
      if (err) {
        console.log("MySQL: Could not drop table", err);
        return;
      }
      con.query(
        "CREATE TABLE IF NOT EXISTS Users (email VARCHAR(50), password VARCHAR(50))",
        (err) => {
          if (err) {
            console.log("MySQL: Could not create table",err);
            return;
          }
          con.query(
            "INSERT INTO Users (email, password) VALUES ('test@test.com','secretPassword');",
            (err) => {
              if (err) {
                console.log("MySQL: Could not insert into the table", err);
                return;
              }
              console.log("Database and table initiated successfully");
              con.end();
            }
          );
        }
      );
    });
})
});
