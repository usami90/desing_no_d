var express = require('express');
var router = express.Router();


var sample_users = {
  "data": [    {
      "name": "田中太郎",
      "books": ["Githubについて", "アジャイル開発について"],
      "skils": ["Github", "アジャイル"]
    }]
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json(sample_users);
});

module.exports = router;
