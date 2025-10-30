const products = require('../controllers/product.controller.js')
const router = require('express').Router()

module.exports = (app) => {
  router.get('/', products.findAll)
  app.use('/api/products', router)
}
