// require('dotenv').config();

// const jwt = require('jsonwebtoken');


async function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
}
module.exports = {requireUser};