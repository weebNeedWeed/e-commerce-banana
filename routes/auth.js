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
router.post("/forgotpassword", authController.postForgotPassword);
router.post("/codecheck", authController.postCodeCheck);
router.post(
	"/createnewpassword",
	authValidate.validateCreateNewPassword,
	authController.postCreateNewPassword
);
router.post("/tokencheck", authController.postAuthToken);

module.exports = router;
