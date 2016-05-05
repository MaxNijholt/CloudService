"use strict";

var Base = require('./Base');
var express = require('express');
var router = express.Router();
var passport = require('../lib/passport');
var User = require('../models/User');

class Auth extends Base {
 
    /**
     * Authentication class
     * Dealing with user login and logouts
     * @param router
     */
    constructor(app) {
        super(router);

        // apply middleware if necessary
        router.use(function (req, res, next) {
            // console.log('auth method called');
            next();
        });

        // commit router to application
        app.use('/auth', router);
        

        // test facebook login
        app.get('/auth/facebook', passport.authenticate('facebook'));

        app.get('/auth/facebook/callback', 
            passport.authenticate('facebook', { failureRedirect: '/' }),
            function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

        app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

        app.get('/auth/google/callback', 
            passport.authenticate('google', { failureRedirect: '/'}),
            function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

        app.get('/logout', function(req, res){
          req.logout();
          res.redirect('/');
        });
        
    }

}

module.exports = Auth;