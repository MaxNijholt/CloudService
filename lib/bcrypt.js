//var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hash: function (password, callback) {
        callback(null, password);
       // bcrypt.hash(password, saltRounds, callback);
    },
    validate: function (password, hash, callback) {
        callback(null, true);
        //bcrypt.compare(password, hash, callback);
    }
};
