"use strict";

var express = require('express');
var router = express.Router();
var passport = require('../lib/passport');
var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'Register' });
}); 

// /*
//  * POST to buddies.
//  */
// router.post('/', passport.authenticate('local-signup'));

/*
 * POST to users.
 */
router.post('/', function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;