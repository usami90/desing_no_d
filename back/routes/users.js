var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const { doQuery } = require("./models/database");

/* PUT Add Users to DB */
router.post("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
    var data = req.body;

    // bodyを表示
    // JSONが格納されているか確認
    // console.log(data);

    /* SQL文の作成 */
    user_add_sql = "";


    // ユーザーの登録
    // await doQuery(user_add_sql);
    

    /* ユーザー一覧送信の処理 */
    var user_sql = "SELECT * FROM user;";
    var user_result = await doQuery(user_sql);
    var users = user_result.map((user) => {
      book = user.books.split(",").map((book) => {
        bookinfo = book.split(":");
        return {
          title: bookinfo[0],
          comment: bookinfo[1],
        };
      });
      return {
        userid: user.id,
        name: user.name,
        books: book,
        skills: user.skills.split(","),
      };
    });

    var skill_sql = "SELECT * FROM skill;";
    var skills = await doQuery(skill_sql);

    res.json({ data: { users: users, skills: skills } });
  })().catch(next);
});

module.exports = router;
