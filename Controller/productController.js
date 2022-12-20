const router = require('express').Router()
const productService = require('./../Service/productService')
const validateObjectId = require('../middleware/validateObjectId')
const admin = require("./../middleware/admin");
const auth = require("../middleware/auth");

router.get('/:id', validateObjectId, async (req, res) => {
  const { id } = req.params
  const foundProduct = await productService.getOne(id)
  res.status(200).send({ data: foundProduct })
})

router.post('/create', [auth, admin], async (req, res) => {
  try {
    await productService.insertOne(req, res)
  } catch (error) {
    res.status(400).send({ data: error })
  }
})

router.put('/decrement/:id', [validateObjectId], async (req, res) => {
  await productService
    .decrementQuantity(req.params.id)
    .then((result) => {
      res
        .status(201)
        .send({ message: 'Product was successfully updated', result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.put('/increment/:id', validateObjectId, async (req, res) => {
  await productService
    .incrementQuantity(req.params.id)
    .then((result) => {
      res
        .status(201)
        .send({ message: 'Product was successfully updated', result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})

router.delete('/:id', [admin, validateObjectId], async (req, res) => {
  await productService.deleteProduct(req, res)
})

router.put('/:id', validateObjectId, async (req, res) => {
  await productService
    .updateById(req.params.id, req.body)
    .then((result) => {
      res
        .status(201)
        .send({ message: 'Product was successfully updated', result })
    })
    .catch((error) => {
      res.status(500).send({ message: error.toString() })
    })
})
router.get('/asd', validateObjectId, async (req, res) => {
  const categories = await categoryService.getAll()
  res.send('OK')
})

router.get('/brand', async (req, res) => {
  const brands = await productService.getBrand()
  res.status(200).send({ data: brands })
})

router.get('/', async (req, res) => {
  const products = await productService.getAll()
  res.send({ data: products })
})

module.exports = router
