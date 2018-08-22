// this file to store the authentication strategies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
// using sessions to track users in our application, 
// we need to serialize and deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
  // create JSON Web Token
  // param[0] user is the payload
  // param[1] is privateKey
  // param[2] is how long the JSON Web Token will be valid
  return jwt.sign(user, config.secretKey,
    {expiresIn: 3600});
};

// options for web tokens strategy
var opts = {};
// how the JSON Web Token should be extracted from the incoming request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// secretKey which I am going to be using within my strategy for the sign in
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
));

// we are not going to make creating sessions in this case
// because "session: false"
exports.verifyUser = passport.authenticate('jwt', {session: false});