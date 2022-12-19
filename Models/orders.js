const Mongoose = require('mongoose')
const { Schema } = Mongoose
const { userSchema } = require('./users')

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  timeStamp: { type: Date, default: Date.now },
  totalPrice : { type: Number, required: true },
})


const Order = Mongoose.model('Order', orderSchema)

module.exports = {
  Order,
  orderSchema,
}
