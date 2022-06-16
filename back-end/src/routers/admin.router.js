const express = require("express");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = new express.Router();
const brandController = require("../controller/admin/brand.controller");
const categoryController = require("../controller/admin/category.controller");
const productController = require("../controller/admin/product.controller");
const statsController = require("../controller/admin/stats.controller");

router.post("/addBrand", auth, adminAuth, brandController.addBrand);
router.put("/brands/:id", auth, adminAuth, brandController.updateBrand);
router.delete("/brands/:id", auth, adminAuth, brandController.deleteBrand);

router.post("/addCategory", auth, adminAuth, categoryController.addCategory);
router.put("/categories/:id", auth, adminAuth, categoryController.updateCategory);
router.delete(
  "/categories/:id",
  auth,
  adminAuth,
  categoryController.deleteCategory
);

router.post("/addProduct", auth, adminAuth, productController.addProduct);
router.put("/products/:id", auth, adminAuth, productController.updateProduct);
router.delete("/products/:id", auth, adminAuth, productController.deleteProduct);

router.get("/statistics/income", auth, adminAuth, statsController.getIncomeStatistics);
router.get("/statistics/newUsers", auth, adminAuth, statsController.getNewUserStatistics);
router.get("/statistics/userStatus", auth, adminAuth, statsController.getUserStatistics);
router.get("/statistics/orders", auth, adminAuth, statsController.getOrderStatistics);

module.exports = router;
