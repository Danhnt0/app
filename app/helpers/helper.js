var bcrypt = require('bcryptjs');
var config = require('config');


function hash_password(password) {
    const salt = bcrypt.genSaltSync(config.get('salt'));
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


function compare_password(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash_password: hash_password,
    compare_password: compare_password
}