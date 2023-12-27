require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.REACT_APP_PORT;
const multer = require("multer");
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 업로드된 파일 저장 경로
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // 확장자
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // 고유한 값 생성
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // 파일명 설정 (원본 파일명 + 고유한 값 + 확장자)
  },
});

const upload = multer({ storage: storage });

const mysql = require("mysql");

// sql 연동
const db = mysql.createConnection({
  user: process.env.REACT_APP_DBUSER,
  host: "localhost",
  password: process.env.REACT_APP_DBPASSWORD,
  database: "board",
});

// 잘 연동 되었는지 확인
db.connect(function (err) {
  if (err) throw err;
  console.log("DB is Connected!");
});

// 글 목록(전체)
app.get("/selectAll", (req, res) => {
  let sql = "SELECT * FROM board";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// 글 목록(페이징)
app.get("/select", (req, res) => {
  const page = req.query.page;
  const sort = req.query.sort;

  let offset = (page - 1) * 5; // 오프셋 계산

  let sql = "";

  if (sort === "최신순")
    sql = `SELECT * FROM board ORDER BY id DESC LIMIT ${offset}, 5`;
  if (sort === "오래된순")
    sql = `SELECT * FROM board ORDER BY id ASC LIMIT ${offset}, 5`;
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

// 댓글 조회
app.get("/comment", (req, res) => {
  const postId = req.query.postId;

  const sql = "SELECT * FROM comment WHERE postid = ? ;";
  db.query(sql, postId, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

// 글 작성
app.post("/write", upload.single("file"), (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;
  const file = req.file.filename;
  const values = [title, content, username, file];

  const sql =
    "INSERT INTO board.board values ((SELECT IFNULL(MAX(b.id) + 1, 1) FROM board b), ?, ?, NOW(), ?, 1, ?)";

  db.query(sql, values, (err, result) => {
    if (err) console.log(err, sql);
    else res.send(result);
  });
});

// 댓글 작성
app.post("/commentWrite", (req, res) => {
  const postId = req.body.postId;
  const username = req.body.username;
  const comment = req.body.comment;
  const values = [parseInt(postId), username, comment];

  const sql = "INSERT INTO board.comment values (?, ?, ?, NOW())";

  db.query(sql, values, (err, result) => {
    if (err) console.log(err, sql);
    else res.send(result);
  });
});
