const mysql = require('mysql2');
require('dotenv/config');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

exports.execute = (query, params = []) => {  
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, result, field) => {
      if(error) {
        reject(error);
      }else {
        resolve(result);
      }
    });
  });
};

module.exports.pool = pool;
