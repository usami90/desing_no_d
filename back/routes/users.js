var express = require('express');
var router = express.Router();


var sample_users = {
  "data": [    {
      "name": "田中太郎",
      "books": ["Githubについて", "アジャイル開発について"],
      "skills": ["Github", "アジャイル"]
    }]
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.json(sample_users);
});

module.exports = router;
