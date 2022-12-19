const Mongoose = require('mongoose');
const config = require('config');
const Joi = require('@hapi/joi');
const { Schema } = Mongoose;
const jwt = require('jsonwebtoken');
const { addressSchema } = require('./address');



const userSchema = new Schema({
    firstName : {type : String, required: true, maxlength: 100},
    lastName : {type : String, required: true, maxlength: 100},
    userName : {type: String, requred: true, minlength: 6, unique: true},
    email : {type : String, required: true, unique: true, minlength: 10, maxlength: 255},
    password: {type : String, required: true, minlength: 6},
    address : {type: addressSchema, required: true},
    isAdmin : {type: Boolean, required: true, default: true}
});




userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id, isAdmin: this.isAdmin, userName: this.userName},
        config.get("jwtPrivateKey"));

    return token; 
};

function validate(user) {
    const schema = Joi.object({
        firstName : Joi.string().max(100).required(),
        lastName : Joi.string().max(100).required(),
        userName : Joi.string().max(150).required(),
        email : Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        isAdmin : Joi.boolean(),
        diaries: Joi.array().required()
    });

    return schema.validate(user);
};



const User = Mongoose.model("User", userSchema);




module.exports.User = User;
module.exports.validate = validate;
