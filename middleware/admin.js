const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')
  if (!config.get('requiresAuth')) return next()

  if (!token) {
    return res.status(401).send({ message: 'Access Denied my guy' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    req.user = decoded
    if (!req.user.isAdmin)
    return res.status(403).send('Access Denied (not admin)')

    return next()
  } catch (error) {
    res.status(400).send('invalid token')
  }
}
