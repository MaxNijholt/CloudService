var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/User');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
    clientID: '1535947766622689',
    clientSecret: '0202b6600f9247bb54e0d4804a2e6cfc',
    callbackURL: "http://127.0.0.1:5000/auth/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'displayName', 'email', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return cb(err);

                // if the user is found, then log them in
                if (user) {
                    return cb(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id = profile.id; // set the users facebook id                   
                    newUser.facebook.token = accessToken; // we will save the accessToken that facebook provides to the user                    
                    // newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    // newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.username = profile._json.name;
                    
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return cb(null, newUser);
                    });
                }

            });
        });
  }
));

passport.use(new GoogleStrategy({
    clientID: '883051046106-o7b7bhn2c2mf5u0q4sgv287ns8d0l7br.apps.googleusercontent.com',
    clientSecret: 'x9eLxw80TitLN_9wMKjGwdzV',
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return cb(err);

                if (user) {

                    // if a user is found, log them in
                    return cb(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.name  = profile.displayName;

                    newUser.username = profile.displayName;

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return cb(null, newUser);
                    });
                }
            });
        });
  }
));

module.exports = passport;