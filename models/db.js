let mysql = require('mysql');
let dbConfig = require('../config/db.config');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});


function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err); // not connected!
            } else {
                connection.query(sql, values, function (error, results) {
                    connection.release();//释放连接，放回pool中
                    if (error) {
                        reject(err);
                    } else {
                        resolve(results);
                    }

                });
            }

        });
    })
}

module.exports = {
    query:query
};