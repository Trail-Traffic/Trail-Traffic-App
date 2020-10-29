const express = require('express');
const router = express.Router();
const mapController = require('./controllers/mapController');
const userController = require('./controllers/userController');

router.get('/getData', mapController.getHeat, (req, res, next) => {
  return next();
})

// add user
router.post('/addUser', userController.addUser, (req, res, next) => {
  return next();
})

// get faves
router.get('/getFaves', userController.getFavorites, (req, res, next) => {
  return next();
})

// add faves
router.post('/addFaves', userController.addFavorite, userController.getFavorites, (req, res, next) => {
  return next();
})

// delete faves
router.delete('/deleteFaves', userController.deleteFavorite, userController.getFavorites, (req, res, next) => {
  return next();
})


module.exports = router;