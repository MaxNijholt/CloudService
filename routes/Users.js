var express = require('express');
var queryHandler = require('express-api-queryhandler');
var router = express.Router();
var User = require('../models/User');
var Buddy = require('../models/Buddy');

router.use(queryHandler.filter());

/*
 * GET users.
 */
router.get('/', function(req, res) {
    User.findUsers(function(err, users){
        if (err) return console.error(err);
        res.json(users);
    });
});

router.get('/me', function(req,res){
    if(req.user){
        res.json(req.user);
    } else {
        var err = {'message': 'Acces denied. You need to be logged in first.'};
        res.status(403);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

/*
 * GET user with given name.
 */
router.get('/:username', function(req, res) {
    User.findByUsername(req.params.username, function(err, users){
        if (err) return console.error(err);
        if(users.length == 0){
            return res.status(400).end('Invalid username');
        }else{
            res.json(users);     
        }
    });
});

/*
 * GET buddies from user with given name.
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
        if(buddies.length == 0){
            return res.status(400).end('Invalid username');
        }else{
            res.json(buddies);     
        }
    });
});

module.exports = router;