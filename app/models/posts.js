var q = require('q');
var db = require('../common/database');


var conn = db.getConnection();

function getAllPosts() {
    if (conn) {
        var defer = q.defer();
        conn.query('SELECT * FROM posts', function (error, results) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(results);
            }
        });
        return defer.promise;
    }
}

function addPost(post) {
    if (conn) {
        var defer = q.defer();
        conn.query('INSERT INTO posts SET ?', post, function (error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}

function getPostById(id) {
    if (conn) {
        var defer = q.defer();
        conn.query('SELECT * FROM posts WHERE id = ?', [id], function (error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}

function updatePost(post, id) {
    if (conn) {
        var defer = q.defer();
        conn.query('UPDATE posts SET ? WHERE id = ?', [post, id], function (error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }

}

function deletePost(id) {
    if (conn) {
        var defer = q.defer();
        conn.query('DELETE FROM posts WHERE id = ?', [id], function (error, result) {
            if (error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
}


module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostById: getPostById,
    updatePost: updatePost,
    deletePost: deletePost

}