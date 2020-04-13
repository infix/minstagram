module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.email === 'a' && req.body.password === 'a') {
      res.status(200).json({ token: 'some-user-jwt-token' })
    } else {
      res.status(400).json({ message: 'Invalid email or password' })
    }
  } else {
    next()
  }
}
