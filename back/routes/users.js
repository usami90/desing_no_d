var express = require("express");
var router = express.Router();

var db = require("./models/database");

var test_users_list = {
  1: require("../test/users/test1.json"),
  2: require("../test/users/test2.json"),
  3: require("../test/users/test3.json"),
  4: require("../test/users/test4.json"),
  5: require("../test/users/test5.json"),
};

/* GET Users from DB */
router.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
    var sql = "SELECT * FROM user;";
    var result = await db.doQuery(sql);
    var data = result.map( (user) => {
      book = user.book.split(",").map( (book) => {
        bookinfo = book.split(":");
        return {
          "title": bookinfo[0],
          "comment": bookinfo[1]
        }
      })
      return {
        "userid": user.user_id,
        "name": user.user_name,
        "books": book,
        "skills": user.skill.split(",")
      }
    })
    res.json({ "data": data });
  })().catch(next);
});

/* GET Test Users */
router.get("/:test", function (req, res, next) {
  var test_users = test_users_list[req.params.test];
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.json(test_users);
});

module.exports = router;
