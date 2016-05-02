"use strict";

var Base = require('./Base');
var express = require('express');
var router = express.Router();
var passport = require('../lib/passport');
var User = require('../models/User');

class Auth extends Base {

    constructor() {
        super(router);

        router.use(function (req, res, next) {
            console.log('auth method called');
            next();
        });

        this.resolve();
    }

    resolve() {

        this.regRoute('post', '/login', [
            'username', 'password'
        ], [], this.postLogin.bind(this));

        this.regRoute('post', '/users', [
            'username', 'password'
        ], [], this.postUser.bind(this));

        this.regRoute('get', '/users/current', [], [], this.getCurrentUser.bind(this), true);
    }

    postLogin(request, input, response) {
        passport.authenticate('local', function (e, user, error, something) {
            if (error) {
                return response.json({
                    success: false,
                    message: 'invalid credentials'
                });
            }

            var token = user.generateToken();
            user.save();

            response.json({
                success: true,
                data: {
                    token: token
                }
            });
        }).apply(this, [request, response]);
    }

    postUser(request, input, response) {
        User.usernameIsUnique(input['username'], function (error, success) {
            if (success) {

                let user = new User({
                    username: input['username'],
                    token: ''
                });

                user.setPassword(input['password'], function (err) {
                    user.save(function (err) {
                        if (err) {
                            return response.status(500).json({
                                success: false
                            });
                        }

                        response.json({
                            success: true
                        });
                    });
                });

            } else {

                response.status(409).json({
                    success: false,
                    message: 'Username is already chosen, please choose another one'
                });
            }
        });
    }

    getCurrentUser(request, input, response) {
        response.json({
            username: request.user.username
        });
    }
}

module.exports = new Auth();