const { query } = require("express");
const db = require('../models.js');
const userController = {};

// ***** Add user ***** //
userController.addUser = (req, res, next) => {
  const checkQuery = 'SELECT * FROM users WHERE id=$1'
  const insertQuery = 'INSERT INTO users (id, email, name, photourl) VALUES ($1, $2, $3, $4) RETURNING *;';
  const { id, email, name, photourl } = req.body;
  const checkValues = [id]
  const insertValues = [id, email, name, photourl];
  
  db.query(checkQuery, checkValues)
    .then((response) => {
      if (response.rows.length === 0) {
        db.query(insertQuery, insertValues)
          .then(response => {
            res.locals.data = response.rows[0];
            return next();
          })
      }
      else {
        res.locals.data = response.rows[0];
        return next();
      }
    })
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