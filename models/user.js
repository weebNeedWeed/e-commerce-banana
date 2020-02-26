const mongoose = require("mongoose");

const User = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	money: Number,
	avatar_link: String
});

const UserModel = mongoose.model("users", User);

module.exports = UserModel;
