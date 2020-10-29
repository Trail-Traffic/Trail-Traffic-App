const fetch = require("node-fetch");
const secret = require("../secrets");
const db = require('./models.js');
const userController = {};

// ***** return user ***** //


// ***** Add favorite ***** //
userController.addFavorite = async (req, res, next) => {
  try {
    const queryText = 'INSERT INTO faves (user_id, trail_id) VALUES ($1, $2) RETURNING *';
    const { user_id, trail_id } = req.body;
    const values = [user_id, trail_id];

    await db.query(queryText, values,)
  } catch(err) {
    return next(err);
  }
}

// ***** Delete favorite ***** //


module.exports = userController;