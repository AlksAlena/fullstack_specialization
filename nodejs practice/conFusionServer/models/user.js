var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  facebookId: String,
  admin:   {
    type: Boolean,
    default: false
  }
});

// add in support for username and hashed storage of the password, 
// using the hash and salt
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);