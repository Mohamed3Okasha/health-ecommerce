const express = require("express");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const router = new express.Router();
const adminController = require("../controller/admin.controller");

router.post("/addBrand", auth, adminAuth, adminController.addBrand);
router.put("/brands/:id", auth, adminAuth, adminController.updateBrand);
router.delete("/brands/:id", auth, adminAuth, adminController.deleteBrand);

router.post("/addCategory", auth, adminAuth, adminController.addCategory);
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

router.get("/statistics/income", auth, adminAuth, adminController.getIncomeStatistics);
router.get("/statistics/newUsers", auth, adminAuth, adminController.getNewUserStatistics);
router.get("/statistics/userStatus", auth, adminAuth, adminController.getUserStatistics);
router.get("/statistics/orders", auth, adminAuth, adminController.getOrderStatistics);

module.exports = router;
