const express = require('express');
const router = express.Router();
const mapController = require('./mapController');

router.get('/getData', mapController.getHeat, (req, res, next) => {
  return next();
})

module.exports = router;