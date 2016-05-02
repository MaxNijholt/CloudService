"use strict";

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var bcrypt = require('../lib/bcrypt');
const tokenLength = 50;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username too short'],
        maxlength: [20, 'Username too long']
    },
    password: String,
    tokens: [{
        token: String,
        date: Date
    }]
});

userSchema.statics.findByUsername = function (username, callback) {
    return this.find({username: username}, callback);
};

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

userSchema.methods.setPassword = function (password, callback) {
    bcrypt.hash(password, function (err, hash) {
        this.password = (!err) ? hash : '';
        callback(err);
    }.bind(this));
};

userSchema.methods.validPassword = function (password, successCallback, failureCallback) {
    bcrypt.validate(password, this.password, function (error, success) {

        if (success) {
            successCallback();
        } else {
            failureCallback();
        }

    });
};

userSchema.methods.verifyToken = function (token) {
    if (token.length != tokenLength) {
        return false;
    }

    for (var index in this.tokens) {
        if (this.tokens[index].token == token) {
            return true;
        }
    }
    return false;
};

userSchema.methods.generateToken = function () {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < tokenLength; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

    this.tokens.push({
        token: token,
        date: new Date()
    });

    return token;
};

userSchema.methods.updateTokenDate = function (token) {
    var toRemove = [];
    for (var index in this.tokens) {
        if (this.tokens[index].token == token) {
            this.tokens[index].date = new Date();
            continue;
        }

        if (((new Date() - this.tokens[index].date) / (1000 * 60 * 60 * 24)) > 30) {
            this.tokens.splice(index, 1);
            index--;
        }
    }

    this.save();
};

userSchema.plugin(autoIncrement.plugin, 'User');

var User = mongoose.model('User', userSchema);

module.exports = User;
