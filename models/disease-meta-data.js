let db = require('../db/mysql-db');

let findSql = 'SELECT * FROM disease_meta_data';

exports.find = function (done) {
    db.get().query(findSql, function (err, result) {
        done(result);
    });
};