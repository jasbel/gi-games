// server.js
const jsonServer = require('json-server')
const { isAuthorized } = require('./helper')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  if (isAuthorized(req)) { // add your authorization logic here
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
 })

server.get('/auth/authentication', (req, res) => {
  res.status(200).jsonp(req.query)
})


// Add this before server.use(router)
server.use('/api/v1', router)
server.use(jsonServer.rewriter({
  // '/api/v1/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))


server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})



server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running:port 8080 ')
})