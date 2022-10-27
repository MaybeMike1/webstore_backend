const express = require('express');
const cors = require('./cors');
const userController = require('./../Controller/userController');
const diaryController = require('./../Controller/diaryController');
const productController = require('./../Controller/productController');
const categoryController = require('./../Controller/categoryController');
const brandController = require('./../Controller/brandController');
const modelController = require('./../Controller/modelController');


module.exports = (app) => {
    app.use(express.json());
    app.use(cors);
    app.use('/api/users', userController);
    app.use('/diary', diaryController);
    app.use('/api/products', productController);
    app.use('/api/categories', categoryController);
    app.use('/api/brands', brandController);
    app.use('/api/models', modelController);
};