const mongoose = require("mongoose");

const khongDau = require("khong-dau");

const product = mongoose.Schema({
	name: String,
	price: Number,
	sale: Number,
	description: String,
	count: Number,
	category: [mongoose.Types.ObjectId],
	image: String,
	url: String,
	tag: String
});

product.methods.generateTag = function() {
	this.tag = khongDau(this.name).toLowerCase();
	return this;
};
product.methods.generateUrl = function() {
	this.url = khongDau(this.name, ["chuyen", "url"]).toLowerCase();
	return this;
};

const productModel = mongoose.model("product", product);

module.exports = productModel;
