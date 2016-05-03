"use strict";

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var buddySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        minlength: [5, 'Name too short'],
        maxlength: [20, 'Name too long']
    },
    champion: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },    
    date: { 
        type: Date, 
        default: Date.now 
    }
});

/**
 * Return the buddies with that name
 * @param name
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
buddySchema.statics.findAll = function (callback) {
    return this.find({}, callback);
};

/**
 * Return the buddies with that name
 * @param name
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
buddySchema.statics.findByName = function (name, callback) {
    return this.find({name: name}, callback);
};

/**
 * Return the buddies from that user
 * @param username
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
buddySchema.statics.findByUsername = function (username, callback) {
    return this.find({username: username}, callback);
};

/**
 * Return the buddies with that champion
 * @param name
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
buddySchema.statics.findByChampion = function (champion, callback) {
    return this.find({champion: champion}, callback);
};

/**
 * Return a champion from that user
 * @param username
 * @param callback
 * @returns {Query|*|FindOperatorsUnordered|FindOperatorsOrdered|Cursor|T}
 */
buddySchema.statics.findByChampionUsername = function (champion, username, callback) {
    return this.find({champion: champion, username: username}, callback);
};

/**
 * Check whether the user already has the buddy
 * @param username
 * @param callback
 */
buddySchema.statics.userHasChampion = function (champion, username, callback) {
    Buddy.findByChampionUsername(champion, username, function (error, users) {
        if (error) {
            callback(error, false);
        } else if (users.length == 0) {
            callback(null, true);
        } else {
            callback({
                message: 'user already has champion'
            }, false);
        }
    });
};

// apply auto-increment
buddySchema.plugin(autoIncrement.plugin, 'Buddy');

// register model
var Buddy = mongoose.model('Buddy', buddySchema);

module.exports = Buddy;
