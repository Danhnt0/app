var config = require('config');
var mySql = require('mysql');

var connection = mySql.createConnection({
    host: config.get("mySql.host"),
    user: config.get("mySql.user"),
    password: config.get("mySql.password"),
    database: config.get("mySql.database")
});

connection.connect()

function getConnection() {
    if (!connection) {
        connection.connect();
    }

    return connection;
}

module.exports = {
    getConnection: getConnection    
}