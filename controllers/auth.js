const users = require("./../models/user");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res) => {
	const err = [];
	const { email, password } = req.body;
	const user = await users.findOne({ email });
	if (!user) {
		err.push("khong tim thay user");
		req.flash("error", err);
		res.redirect("/login");
		return;
	}
	bcrypt.compare(password, user.password, function(compareerr, result) {
		if (compareerr || !result) {
			err.push("dang nhap that bai");
			if (!result) err.push("sai tk hoac mk");
			req.flash("error", err);
			res.redirect("/login");
			if (compareerr) throw compareerr;
			return;
		}
		req.session.user = user;
		return res.redirect("/");
	});
};
exports.postRegister = async (req, res) => {
	const err = [];
	const { email, password } = req.body;
	const user = await users.find({ email });
	if (user.length > 0) err.push("ton tai user");
	if (err.length > 0) {
		req.flash("error", err);
		res.redirect("/register");
		return;
	}
	bcrypt.hash(password, 10, async function(hasherr, hash) {
		if (hasherr) {
			err.push("co loi xay ra khi dk");
			req.flash("error", err);
			res.redirect("/register");
			throw hasherr;
		}
		let newUser = new users({
			username: email,
			email,
			password: hash,
			money: 0,
			avatar_link: ""
		});
		await newUser.save();
		err.push("dang ky thanh cong vui long dang nhap");
		req.flash("error", err);
		res.redirect("/login");
		return;
	});
};
