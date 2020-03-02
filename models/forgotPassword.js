const mongoose = require("mongoose");

const forgotPassword = mongoose.Schema({
	email: String,
	expire: Number,
	code: String
});

module.exports = mongoose.model("forgotPassword", forgotPassword);
