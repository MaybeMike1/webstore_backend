const Mongoose = require('mongoose')
const { Schema } = Mongoose
const { userSchema } = require('./users')
const Joi = require('@hapi/joi')

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  timeStamp: { type: Date, default: Date.now },
  totalPrice : { type: Number, required: true },
})

function validate (model) {
    const schema = Joi.object({
        user: Joi.string().required(),
        products: Joi.array().required(),
        timeStamp: Joi.date().required(),
        totalPrice: Joi.number().required()
    });

    return schema.validate(model);
}



const Order = Mongoose.model('Order', orderSchema)

module.exports = {
  Order,
  orderSchema,
  validate
}
