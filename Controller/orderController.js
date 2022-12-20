const orderService = require('../Service/orderService')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')

const router = require('express').Router()

router.get('/', async (req, res) => {
  await orderService.getAll(req, res)
})

router.post('/', [auth, validateObjectId], async (req, res) => {
  await orderService.createOne(req, res)
})

router.get('/user-order', [auth], async (req, res) => {
  await orderService.getAllOrderByUser(req, res)
})

router.get(':/user', [auth], async (req, res) => {
  await orderService.getOne(req.params.id, req, res)
})

module.exports = router
