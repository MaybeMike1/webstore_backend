const Mongoose = require('mongoose')
const { Product } = require('../Models/product')
const { orderSchema, Order, validate } = require('./../Models/orders')

const orderService = {}

orderService.getOne = async function getOne(_id, res, req) {
  const order = await Order.findById(_id)
    .then((data) => {
      return res.status(200).send({ data: data })
    })
    .catch((error) => {
      return res.status(404).send({ message: error.toString() })
    })

  if (!order) {
    return 'No orders found with id', _id
  }
  return order
}

orderService.getAllOrderByUser = async function getAllOrderByUser(req, res) {
  const user = req.user

  const orders = await Order.find({ user: user._id })
    .then((data) => {
      return res.status(200).send({ data: data })
    })
    .catch((error) => {
      return res.status(500).send({ message: error.toString() })
    })
}

orderService.createOne = async function createOne(req, res) {
  try {
    const user = req.user
    const { errors } = validate(req.body)
    console.log(errors.details[0].message)

    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    const products = await Product.find({ _id: { $in: [...req.body] } })
    let total = 0
    products.forEach((e) => {
      total += e.price
    })

    console.log(total)

    console.log(products)
    const data = req.body

    const savedOrder = await Order.create({
      user: user._id,
      products: req.body,
      totalPrice: total,
    })

    return res.status(201).send({ data: savedOrder })
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Something went wrong... - Please try again shortly' })
  }
}

orderService.getAll = async function getAll(req, res) {
  const orders = await Order.find({})
    .then((data) => {
      return res.status(200).send({ data: data })
    })
    .catch((error) => {
      return res.status(500).send({ message: error.toString() })
    })
}

module.exports = orderService
