"use strict";

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var bcrypt = require('../lib/bcrypt');
const tokenLength = 50;

var userSchema = new Schema({
    username: {
        type: String,
     //   required: true,
        minlength: [4, 'Username too short'],
        maxlength: [20, 'Username too long']
    },
    password: String,
    facebook : {
        id : String,
        token : String,
    },
    google : {
        id : String,
        token : String,
        email : String
    }
});

/**
 * Return the first user which has the given username
 * @param username
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
userSchema.statics.findUsers = function (callback) {
    return this.find({}, callback);
};


/**
 * Return the first user which has the given username
 * @param username
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
userSchema.statics.findByUsername = function (username, callback) {
    return this.find({username: username}, callback);
};

/**
 * Check whether the username is in distinct
 * @param username
 * @param callback
 */
userSchema.statics.usernameIsUnique = function (username, callback) {
    User.findByUsername(username, function (error, users) {
        if (error) {
            callback(error, false);
        } else if (users.length == 0) {
            callback(null, true);
        } else {
            callback({
                message: 'username is duplicate'
            }, false);
        }
    });
};

/**
 * Update a user's password
 * @param password
 * @param callback
 */
userSchema.methods.setPassword = function (password, callback) {
    bcrypt.hash(password, function (err, hash) {
        this.password = (!err) ? hash : '';
        callback(err);
    }.bind(this));
};

/**
 * Password validation
 * @param password
 * @param successCallback
 * @param failureCallback
 */
userSchema.methods.validPassword = function (password, successCallback, failureCallback) {
    bcrypt.validate(password, this.password, function (error, success) {

        if (success) {
            successCallback();
        } else {
            failureCallback();
        }

    });
};


// apply auto-increment
userSchema.plugin(autoIncrement.plugin, 'User');

// register model
var User = mongoose.model('User', userSchema);

module.exports = User;
