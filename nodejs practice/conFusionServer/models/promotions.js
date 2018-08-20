const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add new type Currency of data, which don't support in core
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  price: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false      
  }
}, {
  timestamps: true
});

var Promotions = mongoose.model('Promotion', promoSchema);

module.exports = Promotions;