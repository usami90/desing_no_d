const mysql = require('mysql2');

/* MySQL の接続設定 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passwd',
  database: 'library',
  port: '3306'
});

/* MySQLへの接続 */
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Connection Success');
});


/* SQL文を引数として、コマンドを実行する */
function doQuery(sql){
  return new Promise((resolve, result) => {
    connection.query(sql, (err, result) => {
      console.log(result);
      resolve(result); // デバッグ用コンソール出力
    })
  }).catch('error', (err) =>  reject(err))
}

module.exports = {
  doQuery:doQuery
}