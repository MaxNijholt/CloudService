var express = require('express');
var router = express.Router();

/*
 * GET champions.
 */
router.get('/', function(req, res) {
    // var db = req.db;
    // var collection = db.get('rooms');
    // collection.find({},{},function(e,docs){
    //     res.json(docs);
    // });
    res.json({
        Varus: {
            name: "Varus",
            description: "Zoefzoef pijlen skieten!"
        },
        Teemo: {
            name: "Teemo",
            description: "Ik ben een levende hell! Up, 2, 3, 4."
        },
        Galio: {
            name: "Galio",
            description: "Nobody likes me anymore..."
        },
        Karthus: {
            name: "Karthus",
            description: "Ik kan niks, maar toch gaan er mensen dood."
        }
    });
});

/*
 * POST to champions.
 */
router.post('/', function(req, res) {
    var db = req.db;
    var collection = db.get('rooms');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to champions.
 */
router.delete('/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('rooms');
    var roomToDelete = req.params.name;
    collection.remove({ 'name' : roomToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * PUT to champions.
 */
router.put('/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('rooms');
    var roomToUpdate = req.params.name;
    collection.update({ 'name' : roomToUpdate }, req.body, function(err, result){
        res.send((err === null) ? { msg: '' } : { msg: err });
    });
});

/*
 * GET to champions.
 */
router.get('/:name', function(req, res) {
    var db = req.db;
    var collection = db.get('lines');
    var roomToGet = req.params.name;
    collection.find({ 'room' : roomToGet },{},function(e,docs){
        res.json(docs);
    });
});


module.exports = router;
