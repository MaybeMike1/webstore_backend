const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const { Category, categorySchema } = require('./category');
const { Brand , brandSchema} = require('./brand');
const {Model, modelSchema} = require('./model');


const productSchema = new Schema({
    name : {type : String},
    price : {type : Number},
    quantity : {type : Number},
    brand : {type : brandSchema},
    category : {type : categorySchema},
    model : {type: modelSchema}
    
});



const Product = Mongoose.model('Product', productSchema);

module.exports = {
    Product,
    productSchema
};