const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const mysql = require("mysql");

// sql 연동
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345678",
  database: "board",
});

// 잘 연동 되었는지 확인
db.connect(function (err) {
  if (err) throw err;
  console.log("DB is Connected!");
});

// API Server
app.get("/user", (req, res) => {
  var sql = "SELECT * FROM board;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
