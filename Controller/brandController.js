const router = require('express').Router()
const brandService = require('./../Service/brandService')
const validateObjectId = require('../middleware/validateObjectId')
const admin = require("./../middleware/admin");
const auth = require("../middleware/auth");

router.get('/', async (req, res) => {
  await brandService
    .getBrand()
    .then((result) => {
      res.status(200).send({ data: result })
    })
    .catch((error) => {
      res.status(201).send({ message: error.toString() })
    })
})

router.post('/', [auth, validateObjectId, admin], async (req, res) => {
  await brandService.createBrand(req, res)
})

router.put('/:id', [auth, validateObjectId, admin], async (req, res) => {
  await brandService.updateBrand(req, res)
})

router.delete('/:id', [auth, validateObjectId, admin], async (req, res) => {
  await brandService.deleteBrand(req, res)
})

router.get('/:id', [validateObjectId, auth], async (req, res) => {
  console.log(req.params.id)
  await brandService
    .getBrandById(req, res)
    .then((result) => {
      res.status(200).send({ data: result })
    })
})

module.exports = router
