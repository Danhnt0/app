var q = require('q');
var db = require('../common/database');


var conn = db.getConnection();


function addUser(user) {
    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO user SET ?', user, function(error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

function getUserByEmail(email) {
    if (email) {
        var defer = q.defer();
        var query = conn.query('SELECT * FROM user WHERE email = ?', [email], function(error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
    
            }
        });

        return defer.promise;
    }

    return false;
}


module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail
}