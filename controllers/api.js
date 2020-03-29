const category = require("./../models/category");

const product = require("./../models/product");

const khongDau = require("khong-dau");

exports.getAllCategory = async (req, res) => {
	let parentCate = await category.find({});
	parentCate = parentCate.map((elm) => {
		return {
			name: elm.name,
			level: elm.level
		};
	});
	res.status(200).json(parentCate);
};

exports.getCategory = async (req, res) => {
	let name = req.params.name;
	let data = await category.findOne({ name });
	let responseCate;
	if (data !== null) {
		let subCategory = await data.mapIdToObj();
		responseCate = {
			name: data.name,
			subCategory,
			level: data.level
		};
	}
	res.status(200).json(responseCate);
};

exports.getAllProduct = async (req, res) => {
	let data = await product.find({});

	const perPage = req.query.perpage ? req.query.perpage : 50;

	if (req.query.category) {
		let cateQuery = await category.findOne({ name: req.query.category });
		let cateId = cateQuery ? cateQuery._id : null;
		data = await product.find({ category: { $in: [cateId] } });
	}
	if (req.query.keyword) {
		let keyword = req.query.keyword;
		keyword = khongDau(keyword, ["chuyen"]).toLowerCase();
		data = data.filter((elm) => {
			return elm.tag.indexOf(keyword) > -1;
		});
	}
	if (req.query.pagecount) {
		const pageCount =
			data.length % perPage === 0
				? data.length / perPage
				: Math.floor(data.length / perPage) + 1;
		return res.status(200).json({
			count: pageCount
		});
	}
	if (req.query.page) {
		let pageNum = req.query.page;
		let sliceStartPoint = perPage * (pageNum - 1);
		let sliceEndPoint = perPage * pageNum;
		data = data.slice(sliceStartPoint, sliceEndPoint);
	}
	let responseData = data.map((elm) => {
		let { name, price, sale, description, count, image, url } = elm;
		return {
			name,
			price,
			sale,
			description,
			count,
			image,
			category,
			url
		};
	});

	res.status(200).json(responseData);
};

exports.getProduct = async function(req, res) {
	const { url } = req.params;

	const data = await product.findOne({ url });

	if (!data) {
		res.status(404).send("Not Found");
		return;
	}

	res.status(200).json(data);
	return;
};
