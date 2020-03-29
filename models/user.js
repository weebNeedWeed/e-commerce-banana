const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

let User = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	money: Number,
	avatar_link: String,
	token: String
});

User.methods.createToken = async function() {
	try {
		const hash = await bcrypt.hash(
			this.username + this.email + this.password,
			10
		);
		this.token = hash;
	} catch (err) {
		console.log(err);
	}
};

const UserModel = mongoose.model("users", User);

module.exports = UserModel;
