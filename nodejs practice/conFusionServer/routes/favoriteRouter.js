const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const cors = require('./cors');

var Favorites = require('../models/favorite');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
  // OPTIONS method for preflight request
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    Favorites.findOne({ user: req.user._id })
    .populate('dishes')
    .populate('user')
    .then((favorites) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // [ {_id: '5b8d885906e4433cf04102d6'}, {_id: '5b8d885906e4433cf04102d5'} ]
    var newDishes = req.body; 
    Favorites.findOne({ user: req.user._id })
    .then((customFavoriteList) => {
      if (customFavoriteList == null) {
        // favorites list not exist
        Favorites.create({ dishes: newDishes, user: req.user._id })
        .then((favorites) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorites);
        }, (err) => next(err))
        .catch((err) => next(err));
      } else {
        // favorites list alredy exist
        // adds elements to an array only if they do not already exist in the set
        customFavoriteList.update({ 
          $addToSet: { dishes: newDishes } 
        })
        .then((favorites) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorites);
        }, (err) => next(err))
        .catch((err) => next(err));
      }
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // collection.remove is deprecated, use deleteOne, deleteMany or bulkWrite
    Favorites.findOneAndRemove({ user: req.user._id })
    .then((favorites) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
    });

  favoriteRouter.route('/:dishId')
  // OPTIONS method for preflight request
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/' + req.params.dishId);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((customFavoriteList) => {
      if (customFavoriteList == null) {
        // favorites list not exist
        Favorites.create({ dishes: req.params.dishId, user: req.user._id })
        .then((favorites) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorites);
        }, (err) => next(err))
        .catch((err) => next(err));
      } else {
        // favorites list alredy exist
        // adds element to an array only if they do not already exist in the set
        customFavoriteList.update({ 
          $addToSet: { dishes: req.params.dishId } 
        })
        .then((favorites) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorites);
        }, (err) => next(err))
        .catch((err) => next(err));
      }
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/' + req.params.dishId);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((customFavoriteList) => {
      if (customFavoriteList == null) {
        // favorites list not exist
        err = new Error('Favorites list for user ID ' + req.user._id + ' not found');
        err.status = 404;
        return next(err);
      } else {
        // favorites list alredy exist
        // removes all array elements that match a specified query
        customFavoriteList.update({ 
          $pull: { dishes: req.params.dishId } 
        })
        .then((favorite) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }, (err) => next(err))
        .catch((err) => next(err));
      }
    }, (err) => next(err))
    .catch((err) => next(err));
  })

  module.exports = favoriteRouter;



