const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // GEt the user from jwt token and adding it to req
  try {
    const token = req.session.userjwtoken;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Token not available.'})
    }
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data.user
    next()
  } catch (error) {
    return res
      .status(401)
      .json({
        message: 'Please Authenticate using valid token.',
        error: error.message,
      })
  }
}

module.exports = fetchuser
