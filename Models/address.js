const Joi = require("@hapi/joi");
const Mongoose = require("mongoose");
const { Schema } = Mongoose;

const addressSchema = new Schema({
  streetName: { type: String },
  streetNumber: { type: Number },
  zipCode: { type: String },
  city: { type: String },
  country: { type: String },
});

const addressModel = Mongoose.model("Address", addressSchema);



function validate(address){
    const schema = Joi.object({
        streetName : Joi.string().max(150).required(),
        streetNumber : Joi.number().required(),
        city : Joi.string().required(),
        country: Joi.string().required()
    });

    return schema.validate(address);
};

module.exports = {
  addressSchema,
  addressModel,
};
