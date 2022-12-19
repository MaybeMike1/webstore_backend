const {Mongoose, isValidObjectId, Schema } = require('mongoose')
const { Product } = require('./../Models/product')
const { Brand } = require('./../Models/brand')
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
  const product = await Product.findByIdAndUpdate({_id : _id}, {$set: {...req}}).exec();
  const updatedProduct = await Product.findOne({_id : _id});
  return updatedProduct;
}
async function getBrand() {
  return await Brand.find({})
}

async function deleteProduct(_id) {
  return await Product.findByIdAndDelete(_id)
}

async function createProductObject(req) {
  try {
    const requestCategory = req.body.category
    const requestBrand = req.body.brand

    console.log(requestBrand, requestCategory)

    const category =
      (await Category.findOne({ category: requestCategory })) ??
      (await Category.create({ category: requestCategory }))
    const brand =
      (await Brand.findOne({ name: requestBrand })) ??
      (await Brand.create({ name: requestBrand }))

    if (!category) {
      const newCategory = await Category.create({ category: requestCategory })
      console.log('New category added', newCategory)
    }

    if (!brand) {
      const newBrand = await Brand.create({ name: requestBrand })
      console.log('new brand creadted', newBrand)
    }

    console.log(brand, '|', category)

    const productObject = {
      name: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      brand: brand,
      category: category,
    }

    Product.create(productObject).catch((error) => {
      throw error
    })

    return productObject
  } catch (error) {
    throw error
  }
}

async function insertOne(req) {
  try {
    return await createProductObject(req)
  } catch (error) {
    throw error
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
