const express = require("express");
const cors = require("./cors");
const userController = require("./../Controller/userController");
const productController = require("./../Controller/productController");
const categoryController = require("./../Controller/categoryController");
const brandController = require("./../Controller/brandController");
const modelController = require("./../Controller/modelController");
const orderController = require("./../Controller/orderController");
const errorMiddleware = require("./../middleware/errors");

module.exports = (app) => {
  app.use(express.json());
  app.use(errorMiddleware)
  app.use("/api/users", userController);
  app.use("/api/products", productController);
  app.use("/api/categories", categoryController);
  app.use("/api/brands", brandController);
  app.use("/api/models", modelController);
  app.use("/api/orders", orderController);
};
