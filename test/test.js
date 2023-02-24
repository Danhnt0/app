var bcryptjs = require('bcryptjs');

var password = '123456';

var salt = bcryptjs.genSaltSync(10);
var hash = bcryptjs.hashSync(password, salt);

// Store hash in file text.

var fs = require('fs');


// Read hash from file text.
var key =  fs.readFileSync('hash.txt', 'utf8');
console.log(key);


console.log(bcryptjs.compareSync(password, key));