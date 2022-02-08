var express = require('express');
var router = express.Router();

var test_users_list = {
  "1": require('../test/users/test1.json'),
  "2": require('../test/users/test2.json'),
  "3": require('../test/users/test3.json'), 
  "4": require('../test/users/test4.json'),
  "5": require('../test/users/test5.json')
}

var sample_users = {
  "data": [    {
      "id": "1",
      "name": "田中太郎",
      "books": ["Githubについて", "アジャイル開発について"],
      "skills": ["Github", "アジャイル"]
    }]
};

/* GET Users */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.json(sample_users);
});


/* GET Test Users */
router.get('/:test', function(req, res, next) {
  var test_users = test_users_list[req.params.test]
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.json(test_users);
});


module.exports = router;
