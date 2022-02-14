var express = require("express");
var router = express.Router();

const { doQuery } = require("./models/database");

const data = {
  name: "田中太郎",
  skills: ["アジャイル", "Github"],
  books: [
    {
      title: "アジャイルについて",
      comment: " 初心者向け",
    },
    {
      title: "Githubについて",
      comment: "初心者向け",
    },
  ],
};

/* PUT Add User to DB */
router.post("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
    // bodyを表示
    // JSONが格納されているか確認
    // var data = req.body;
    // console.log(data);

    /* 入力条件のチェック */
    if (check_input(data)) {

        /* SQL文の作成 */
      user_add_sql = "insert into library.user (name,books,skills)+  values (\
        '"+data.name+"',\
        '"+data.books.map(book =>book.title+":"+book.comment).join(",")+"',\
        '"+data.skills.join(",")+"');";

      // ユーザーの登録
    await doQuery(user_add_sql);
    }

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


/* 入力条件のチェック */
function check_input(json_data){
return true;
}

module.exports = router;
