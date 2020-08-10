const express = require('express')
const router = express.Router()
const product = require('./product')
const category = require('./category')
const history = require('./history')

router
  .use('/products', product)
  .use('/categories', category)
  .use('/histories', history)

module.exports = router
