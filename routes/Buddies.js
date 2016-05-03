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
