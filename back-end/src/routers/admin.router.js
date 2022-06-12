const express = require("express");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = new express.Router();
const adminController = require("../controller/admin.controller");

router.post("/addBrand", auth, adminAuth, adminController.addBrand);
router.get("/brands", auth, adminAuth, adminController.getAllBrands);
router.put("/brands/:id", auth, adminAuth, adminController.updateBrand);
router.delete("/brands/:id", auth, adminAuth, adminController.deleteBrand);

router.post("/addCategory", auth, adminAuth, adminController.addCategory);
router.get("/categories", auth, adminAuth, adminController.getAllCategories);
router.put("/categories/:id", auth, adminAuth, adminController.updateCategory);
router.delete(
  "/categories/:id",
  auth,
  adminAuth,
  adminController.deleteCategory
);

router.post("/addProduct", auth, adminAuth, adminController.addProduct);
router.put("/products/:id", auth, adminAuth, adminController.updateProduct);
router.delete("/products/:id", auth, adminAuth, adminController.deleteProduct);

module.exports = router;
