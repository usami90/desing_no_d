var express = require("express");
var router = express.Router();

const { doQuery } = require("./models/database");

/* GET Users and Skills from DB */
router.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
    const user_sql = "SELECT * FROM user;";
    var user_result = await doQuery(user_sql);
    var users = user_result
      .map((user) => {
        user.books =
          user.books.length > 0
            ? user.books
                .split(",")
                .map((book) => book.split(":"))
                .map((bookinfo) => {
                  return { title: bookinfo[0], comment: bookinfo[1] };
                })
            : [];
        return user;
      })
      .map((user) => {
        return {
          userid: user.id,
          name: user.name,
          books: user.books,
          skills: user.skills.split(","),
        };
      });

    const skill_sql = "SELECT * FROM skill;";
    var skills = await doQuery(skill_sql);

    res.json({ data: { users: users, skills: skills } });
  })().catch(next);
});

module.exports = router;
