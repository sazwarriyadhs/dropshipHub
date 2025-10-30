const { authJwt } = require('../middleware')
const controller = require('../controllers/order.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
    next()
  })

  // Create a new order
  app.post('/api/orders', [authJwt.verifyToken], controller.createOrder)

  // Get all orders for a user
  app.get('/api/orders', [authJwt.verifyToken], controller.getOrders)

  // Get a single order by id
  app.get('/api/orders/:id', [authJwt.verifyToken], controller.getOrderById)
}
