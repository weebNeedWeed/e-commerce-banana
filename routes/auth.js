const express = require("express");

const router = express.Router();

const authController = require("./../controllers/auth");

const authValidate = require("./../validates/auth");

router.post("/login", authValidate.loginValidate, authController.postLogin);

router.post(
	"/register",
	authValidate.registerValidate,
	authController.postRegister
);

module.exports = router;
