const jwt = require('jsonwebtoken')
const JWT_SECRET = 'OmmIk@$143'
 
const fetchuser = (req, res, next) => {
  // GEt the user from jwt token and adding it to req
  try {
    const token = req.header('auth-token')
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Please Authenticate using valid token.' })
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
