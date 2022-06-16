const express = require("express");
const router = new express.Router();
const commonController = require("../controller/common/common.controller");
const productController = require("../controller/common/product.controller");
const upload = require("../middleware/uploadImage");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);

router.get("/brands", commonController.getAllBrands);
router.get("/categories", commonController.getAllCategories);
router.post("/images", upload.single("images"), commonController.sendImage);

module.exports = router;
