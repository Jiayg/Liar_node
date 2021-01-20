const mysql = require('mysql');
const config = require('./ormconfig');

const database = config.database;
config.user = config.username;
config.database = null;
const connection = mysql.createConnection(config);

let count = 0;

// 创建数据库
function run() {
  count++;
  connection.connect(function (err) {
    if (err) {
      if (count > 5) throw err;
      console.log('hihi' + count);
      setTimeout(run, 2000);
    } else {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${database} default character set utf8 COLLATE utf8_general_ci;`,
        function (error, results, fields) {
          if (error) {
            throw error;
          }
          console.log(`CREATEED DATABASE IF NOT EXISTS: ${database} !!!`);
        },
      );
      connection.end();
    }
  });
}

run();
