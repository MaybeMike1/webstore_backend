const Mongoose = require('mongoose')
const { Schema } = Mongoose

const brandSchema = new Schema({
  name: { type: String, required: true },
})

function validate(brand) {
  const schema = Joi.object({
    name: Joi.string().max(100).required(),
  })

  return schema.validate(brand)
}
const Brand = Mongoose.model('Brand', brandSchema)

module.exports = { Brand, brandSchema, validate }
