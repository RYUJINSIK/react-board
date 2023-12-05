const express = require("express");
const app = express();
const port = 3001;

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

// 글 목록
app.get("/select", (req, res) => {
  const sql = "SELECT * FROM board;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// 글 조회
app.get("/read", (req, res) => {
  const postId = req.query.postId;

  const sql = "SELECT * FROM board WHERE id = ? ;";
  db.query(sql, postId, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// //글 작성
// app.post("/write", (req, res) => {
//   const title = req.query.title;
//   const content = req.query.content;
//   const username = req.query.username;
//   const values = [title, content, username];

//   //SQL 코드
//   const sql =
//     "INSERT INTO board.board values ((SELECT IFNULL(MAX(b.id) + 1, 1) FROM board b), ?, ?, NOW(), ?, 1)";

//   db.query(sql, values, (err, result) => {
//     if (err) console.log(err);
//     else res.send(result);
//   });
// });

app.post("/write", upload.single("file"), (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;
  const file = req.file.path;
  const values = [title, content, username, file];

  // SQL 코드
  const sql =
    "INSERT INTO board.board values ((SELECT IFNULL(MAX(b.id) + 1, 1) FROM board b), ?, ?, NOW(), ?, 1, ?)";

  db.query(sql, values, (err, result) => {
    if (err) console.log(err, sql);
    else res.send(result);
  });
});
