var express = require("express");
var router = express.Router();

var db = require("./models/database");
var sample_skills = 
   [
   { "id":1, "name": "アジャイル"},
  { "id":2, "name": "Github"},
  { "id":3, "name": "オラクル"},
  { "id":4, "name": "デザイン"}
  ];
  

/* GET Users from DB */
router.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  (async () => {
    var sql = "SELECT * FROM user;";
    var result = await db.doQuery(sql);
    var users = result.map( (user) => {
      book = user.books.split(",").map( (book) => {
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
        "skills": user.skills.split(",")
      }
    })
    res.json({"data": {"users":users,"skills": sample_skills}});
  })().catch(next);
});

module.exports = router;