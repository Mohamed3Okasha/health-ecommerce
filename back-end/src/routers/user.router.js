const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const userController = require("../controller/user.controller");

router.post("/users", userController.register);

router.post("/users/login", userController.login);

router.post("/users/logout", auth, userController.logout);

router.post("/users/logoutAll", auth, userController.logoutAll);

router.get("/users/me", auth, userController.me);

module.exports = router;
