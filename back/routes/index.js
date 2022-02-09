var express = require("express");
var router = express.Router();

const { doQuery } = require("./models/database");

/* GET Users and Skills from DB */
router.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
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
        userid: user.user_id,
        name: user.user_name,
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
