var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  // removed fields username and password because
  // they will be added automatically by passport-local-mongoose
  admin: {
    type: Boolean,
    default: false
  }
});

// add in support for username and hashed storage of the password, 
// using the hash and salt
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);