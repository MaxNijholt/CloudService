var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');
var TokenStrategy = require('passport-accesstoken').Strategy;

passport.use(new TokenStrategy(function (token, done) {
        User.findOne({token: token}, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!user.verifyToken(token)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            // validate the password
            user.validPassword(password, function success() {
                // password correct
                done(null, user);
            }, function failure() {
                // password incorrect
                done(null, false, {message: 'Incorrect password.'});
            });
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: 1535947766622689,
    clientSecret: 0202b6600f9247bb54e0d4804a2e6cfc,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: 883051046106-o7b7bhn2c2mf5u0q4sgv287ns8d0l7br.apps.googleusercontent.com,
    clientSecret: x9eLxw80TitLN_9wMKjGwdzV,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: yucabAuzkX0EGXfb2NuX8gQH9,
    consumerSecret: OexmhGGJHaZD6ontxkpLdXozkNuAegJqaGGC6J7TTNi39xZOMp,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;