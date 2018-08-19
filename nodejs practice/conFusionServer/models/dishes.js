const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add new type Currency of data, which don't support in core
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:  {
    type: String,
    required: true
  },
  author:  {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var dishSchema = new Schema({
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
  category: {
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
    default:false      
  },
  comments:[commentSchema]
}, {
  timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;