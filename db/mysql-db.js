let mysql = require('mysql');
let connection = null;

exports.connect = function (done) {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'gastrousus'
    });

    done();
};

exports.get = function () {
    return connection;
};