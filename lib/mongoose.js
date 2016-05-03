"use strict";

const username = 'bram';
const password = 'admin';

var mongoose = require('mongoose');
var assert = require('assert');

var url = 'mongodb://' + username + ':' + password + '@ds011432.mlab.com:11432/cloudservices';
var autoIncrement = require('mongoose-auto-increment');

mongoose.connect(url, function(err) {
    assert.equal(null, err);
    console.log('Connection to database established');
});
autoIncrement.initialize(mongoose);

module.exports = mongoose;