var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Favorites', favoriteSchema);