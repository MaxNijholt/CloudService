var express = require('express');
var queryHandler = require('express-api-queryhandler');
var router = express.Router();
var Buddy = require('../models/Buddy');

router.use(queryHandler.filter());
router.use(queryHandler.pagination({limit: 25}));

/*
 * GET buddies.
 */
router.get('/', function(req, res) {
    var filter = {};
    var options = req.options;
    console.log(req.options);
    
    if(req.where.champion){
        filter.champion = req.where.champion;
    }
    if(req.where.name){
        filter.name = req.where.name;
    }
    if(req.where.username){
        filter.username = req.where.username;
    }
    
    Buddy.findAll(filter, options, function(err, buddies){
        if (err) return console.error(err);
        var response = {
            filter : filter,
            options: options,
            data: buddies
        }
        res.json(response);
    });
});

/*
 * POST to buddies.
 */
router.post('/', function(req, res) {
    var buddy = new Buddy(req.body);
    if(req.user && req.user.username == buddy.username){
        buddy.save(function(err) {
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        }); 
    } else {
        var err = {'message': 'Acces denied. Users do not match.'};
        res.status(403);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

/*
 * DELETE to buddies.
 */
router.delete('/:name', function(req, res) {
    var buddyuser;
    Buddy.findByName(req.params.name, function(err, buddy){
        if (err) return console.error(err);
        buddyuser = buddy[0].username;
        if(req.user && req.user.username == buddyuser){
            Buddy.remove({ name: req.params.name }, function(err) {
                res.send(
                    (err === null) ? { msg: '' } : { msg: err }
                );
            });
        } else {
            var err = {'message': 'Acces denied. You are not the User of this budy'};
            res.status(403);
            res.render('error', {
                message: err.message,
                error: {}
            });
        }
    });   
});

/*
 * PUT to buddies.
 */
router.put('/:name', function(req, res) {
    var query = { name: req.params.name };
    var values = req.body;
    var options = { multi: false };
    if(req.user && req.user.username == values.username){
        console.log(values);
        Buddy.update(query, values, options, function(err) {
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        });
    } else {
        var err = {'message': 'Acces denied. You are not the User of this budy'};
        res.status(403);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

/*
 * GET to buddies.
 */
router.get('/:name', function(req, res) {
    Buddy.findByName(req.params.name, function(err, buddies){
        if (err) return console.error(err);
        if(buddies.length == 0){
            return res.status(400).end('Invalid name');
        }else{
            res.json(buddies[0]);            
        }
    });
});


module.exports = router;
