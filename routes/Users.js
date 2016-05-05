var express = require('express');
var queryHandler = require('express-api-queryhandler');
var router = express.Router();
var User = require('../models/User');
var Buddy = require('../models/Buddy');

router.use(queryHandler.filter());

/*
 * GET buddies.
 */
router.get('/:username/Buddies', function(req, res) {
    var filter = {};
    filter.username = req.params.username;
    
    if(req.where.champion){
        filter.champion = req.where.champion;
    }
    if(req.where.name){
        filter.name = req.where.name;
    }
    
    Buddy.findAll(filter, function(err, buddies){
        if (err) return console.error(err);
        res.json(buddies);
    });
});

module.exports = router;