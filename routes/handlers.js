require("dotenv").config();

const express = require('express');
const router = express.Router(); 
const mysql = require('mysql')
const validator = require('validator');

const {
  MYSQL_USER = 'root',
  MYSQL_HOST = 'localhost',
  MYSQL_DATABASE = 'presentation',
  MYSQL_PASSWORD = 'password',
  MYSQL_PORT = 3306
} = process.env;
  
const con = mysql.createConnection({
  user: MYSQL_USER,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  connectTimeout: 60000
});

// Routing 
router.get('/', async (req, res) => {
  if (con.state === 'disconnected') {
    con.connect(function(err) {
      if (err) {
        res.send("MySQL: Could not connect to database", err);
        return;
      }
      res.send('Server Online')
    });
  } else {
    res.send('Server Online');
  }
});

router.get('/:sink/login', (req, res) => {
  const sink = req.params.sink;

  res.render(`login-${sink}`);
});

// For a successful exploit the `emailInput` property in the body should be something like "' or 1=1-- "
router.post('/:sink/login', async (req, res) => {
  const sink = req.params.sink;
  const body = req.body;
  let user = {}

  if (sink == 'safe') {
    validator.isEmail(body.emailInput)
    validator.isAlpha(body.passwordInput) // This is contrived but we will do it for the sake of the example
  }

  con.query(`SELECT * FROM Users WHERE email='${body.emailInput}' AND password='${body.passwordInput}'`, (err, values) => {
    if (err) console.log({err})
    
    user = values?.[0]

    res.send({user})
  })
});

module.exports = router;


