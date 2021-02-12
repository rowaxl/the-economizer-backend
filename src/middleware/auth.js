const jwt = require('jsonwebtoken')
const Users = require('../models/User')

module.exports = async (req, res, next) => {
  const { headers } = req

  if (!headers['access-token']) {
    return res.status(401).send({ error: 'request not include access token' })
  }

  const token = headers['access-token']
  const cert = process.env.AUTH_SECRET
  const decoded = jwt.decode(token, cert, { algorithm: 'HS256' })

  const { email, name, image, exp } = decoded

  if (Date.now() > exp * 1000) {
    return res.status(401).send({ error: 'Token Expired' })
  }

  let user = await Users.findOne({ email })

  if (!user) {
    console.log('user not exists')
    user = await new Users({ email, name, image }).save()
  }

  req.user = user

  next();
}