const { query } = require("express");
const db = require('../models.js');
const userController = {};

// ***** Add user ***** //
userController.addUser = async (req, res, next) => {
  try {
    const queryText = 'INSERT INTO users (username) VALUES ($1) RETURNING *;';
    const { username } = req.body;
    const values = [username];
    
    await db.query(queryText, values,
      (err, response) => {
        res.locals.data = response.rows[0];
      })
  } catch(err) {
    return next(err);
  }
}

// ***** Get favorites, returns array of favorite names ***** //
userController.getFavorites = async (req, res, next) => {
  try {
    const queryText = 'SELECT name FROM trails WHERE id = (SELECT trail_id FROM faves WHERE user_id=$1);';
    const { user_id } = req.body;
    const values = [user_id];
    await db.query(queryText, values,
      (err, response) => {
        res.locals.data = response.rows;
      })
  } catch(err) {
    return next(err);
  }
}

// ***** Add favorite ***** //
userController.addFavorite = async (req, res, next) => {
  try {
    const queryText = 'INSERT INTO faves (user_id, trail_id) VALUES ($1, $2) RETURNING *;';
    const { user_id, trail_id } = req.body;
    const values = [user_id, trail_id];

    await db.query(queryText, values,
      (err, response) => {
        return next();
      }
      )
  } catch(err) {
    return next(err);
  }
}

// ***** Delete favorite ***** //
userController.deleteFavorite = async (req, res, next) => {
  try{
    const queryText = 'DELETE FROM faves WHERE user_id = $1 AND trail_id = $2 RETURNING user_id;';
    const { user_id, trail_id } = req.body;
    const values = [user_id, trail_id];
  
    await db.query(queryText, values,
      (err, response) => {
        return next();
      })
  } catch(err) {
    return next(err);
  }
}

module.exports = userController;