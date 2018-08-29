// this file to store the authentication strategies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

const Dishes = require('./models/dishes');

// use static authenticate method of model in LocalStrategy
// authenticate() Generates a function that is used in Passport's LocalStrategy
// if the name of the strategy is not specified, then 'local'
exports.local = passport.use(new LocalStrategy(User.authenticate()));
// using sessions to track users in our application, 
// we need to serialize and deserialize the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create JSON Web Token: 
// user is a payload, privateKey and how long the JSON Web Token will be valid
exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey,
    {expiresIn: 360000});
};

// options for web tokens strategy
var opts = {};
// how the JSON Web Token should be extracted from the incoming request
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// secretKey which I am going to be using within my strategy for the sign in
opts.secretOrKey = config.secretKey;

// So, when passport parses the request message, 
// it will use the strategy and then extract information 
// and load it onto our request message
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
// so "session: false"
exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = function(req, res, next) {
  if (req.user.admin) next();
  else {
    var err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    next(err);
  }
}

exports.verifyOwner = function(req, res, next) {
  Dishes.findById(req.params.dishId)
    .then((dish) => {
      if (req.user._id.equals(dish.comments.id(req.params.commentId).author)) {
        next();
      } else {
        var err = new Error('You are not owner this comment!');
        err.status = 403;
        next(err);
      }
    }, (err) => next(err))
    .catch((err) => next(err));
}