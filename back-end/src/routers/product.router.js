const express = require("express");
const productController = require("../controller/product.controller");
const router = new express.Router();

router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProduct);

module.exports = router;
