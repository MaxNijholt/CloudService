var express = require('express');
var queryHandler = require('express-api-queryhandler');
var router = express.Router();
var Buddy = require('../models/Buddy');

router.use(queryHandler.filter());

/*
 * GET buddies.
 */
router.get('/', function(req, res) {
    var filter = {};
    
    if(req.where.champion){
        filter.champion = req.where.champion;
    }
    if(req.where.name){
        filter.name = req.where.name;
    }
    if(req.where.username){
        filter.username = req.where.username;
    }
    
    Buddy.findAll(filter, function(err, buddies){
        if (err) return console.error(err);
        res.json(buddies);
    });
});

/*
 * POST to buddies.
 */
router.post('/', function(req, res) {
    var buddy = new Buddy(req.body);

    buddy.save(function(err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to buddies.
 */
router.delete('/:name', function(req, res) {
    Buddy.remove({ name: req.params.name }, function(err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to buddies.
 */
router.put('/:name', function(req, res) {
    var query = { name: req.params.name };
    var values = req.body;
    var options = { multi: false };
    Buddy.update(query, values, options, function(err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * GET to buddies.
 */
router.get('/:name', function(req, res) {
    Buddy.findByName(req.params.name, function(err, buddies){
        if (err) return console.error(err);
        res.json(buddies);
    });
});


module.exports = router;
