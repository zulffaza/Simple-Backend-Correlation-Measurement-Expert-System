let db = require('../db/mysql-db');

let findSql = 'SELECT * FROM diseases ORDER BY disease_id ASC';

exports.find = function (done) {
    db.get().query(findSql, function (err, result) {
        done(result);
    });
};