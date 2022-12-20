const { Mongoose, isValidObjectId, Schema } = require('mongoose')
const { Product, validate } = require('./../Models/product')
const { Brand } = require('./../Models/brand')
const { Model } = require('./../Models/model')
const { Category } = require('./../Models/category')

async function getOne(_id) {
  const product = await Product.findOne({ _id: _id })
  if (!product) {
    return 'No product found with id', _id
  }

  return product
}

async function getAll() {
  const products = await Product.find().sort('name')
  return products
}

async function getCategory() {
  const products = await Category.find({ category: 'something' }).sort('name')
  return products
}

async function decrementQuantity(_id) {
  return await Product.findByIdAndUpdate(
    { _id: _id },
    { $inc: { quantity: -1 } },
  )
}

async function incrementQuantity(_id) {
  return await Product.findByIdAndUpdate(
    { _id: _id },
    { $inc: { quantity: 1 } },
  )
}

async function updateById(_id, req) {
  const product = await Product.findByIdAndUpdate(
    { _id: _id },
    { $set: { ...req } },
  ).exec()
  const updatedProduct = await Product.findOne({ _id: _id })
  return updatedProduct
}
async function getBrand() {
  return await Brand.find({})
}

async function deleteProduct(req, res) {
  return await Product.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Product not found' })
      }
      return res.status(200).send({ message: 'Product deleted' })
    })
    .catch((error) => {
      return res.status(500).send({ message: error.toString() })
    })
}

async function createProductObject(req) {
  try {
    const requestCategory = req.body.category
    const requestBrand = req.body.brand
    const requestModel = req.body.model

    const category = await Category.findOne({ _id: requestCategory })

    const brand = await Brand.findOne({ _id: requestBrand })

    const model = await Model.findOne({ _id: requestModel })

    if (!category || !brand) {
      return res.status(404).send({ message: 'Category or brand not found' })
    }

    const productObject = {
      name: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      brand: brand.id,
      category: category.id,
      model: model.id,
    }

    return productObject
  } catch (error) {
    throw error
  }
}

async function insertOne(req, res) {
  try {
    const { error } = validate(req.body)
    if (error) {
      return res.status(400).send({ message: error.details[0].message })
    }

    const productObject = await createProductObject(req)

    const product = new Product(productObject)

    await product.save().then((data) => {
      return res.status(201).send({ data: 'Product successfully added' })
    })
  } catch (error) {
    res.status(500).send({ message: error.toString() })
  }
}

const productService = {
  insertOne,
  updateById,
  getOne,
  getAll,
  getBrand,
  getCategory,
  decrementQuantity,
  incrementQuantity,
  deleteProduct,
}

module.exports = productService
