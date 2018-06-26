let db = require('../db/mysql-db');

let findSql = 'SELECT * FROM disease_meta_data_2';

exports.find = function (done) {
    db.get().query(findSql, function (err, result) {
        done(result);
    });
};