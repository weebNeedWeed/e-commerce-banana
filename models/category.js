const mongoose = require("mongoose");

let ObjectId = mongoose.Types.ObjectId;

const Category = mongoose.Schema({
	name: String,
	subCategory: [ObjectId],
	level: Number
});

Category.methods.mapIdToObj = async function() {
	let arr = [...this.subCategory];
	for (let i in arr) {
		let subCateObj = await this.model("category").findOne({ _id: arr[i] });
		arr[i] = {
			name: subCateObj.name,
			subCategory: subCateObj.subCategory,
			level: subCateObj.level
		};
	}
	return arr;
};

let CateModel = mongoose.model("category", Category);

module.exports = CateModel;
