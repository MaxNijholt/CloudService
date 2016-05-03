var express = require('express');
var router = express.Router();
var Buddy = require('../models/Buddy');

/*
 * GET buddies.
 */
router.get('/', function(req, res) {
    Buddy.findAll(function(err, buddies){
        if (err) return console.error(err);
        res.json(buddies);
    });
});

/*
 * POST to buddies.
 */
router.post('/', function(req, res) {
    var buddy = new Buddy(req.body);

    buddy.save(function(err, buddy) {
        if (err) return console.error(err);
        res.json(buddy);
    });
});

/*
 * DELETE to buddies.
 */
router.delete('/:name', function(req, res) {
    Buddy.remove({ name: req.params.name }, function(err, buddy) {
        if (err) return console.error(err);
        res.json(buddy);
    });
});

/*
 * PUT to buddies.
 */
router.put('/:name', function(req, res) {
    var query = { name: req.params.name };
    var values = req.body;
    var options = { multi: false };
    Buddy.update(query, values, options, function(err, buddy) {
        if (err) return console.error(err);
        res.json(buddy);
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
