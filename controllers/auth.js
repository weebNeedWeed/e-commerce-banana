const users = require("./../models/user");

const bcrypt = require("bcrypt");

const mailer = require("./../utils/mailer");

const forgotPassword = require("./../models/forgotPassword");

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
		try {
			mailer.sendMail(email, "", "dang ky thanh cong", "");
		} catch (error) {
			console.log(error);
		}
		req.flash("error", err);
		res.redirect("/login");
		return;
	});
};

exports.postForgotPassword = async (req, res) => {
	const genUid = () => {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4();
	};
	const { email } = req.body;
	const err = [];
	const user = await users.find({ email });
	let isSetNewPass = await forgotPassword.find({ email });
	if (user.length === 0) {
		err.push("khong tim thay user");
		req.flash("error", err);
		res.redirect("/forgotpassword");
		return;
	} else if (
		isSetNewPass.length > 0 &&
		new Date().getTime() < isSetNewPass[0].expire
	) {
		err.push("vui long nhap ma da duoc gui cho ban");
		req.flash("error", err);
		await bcrypt.hash(isSetNewPass[0].code, 10, async (hasherr, hash) => {
			if (hasherr) {
				res.send(hasherr);
				return;
			}
			res.redirect(`/forgotpassword?email=${email}&code=${hash}`);
		});
		return;
	}
	await forgotPassword.deleteOne({ email });
	let code = genUid();
	let expire = new Date().getTime() + 20 * 60 * 1000;
	const newCodeObj = {
		email,
		expire
	};
	try {
		mailer.sendMail(email, "", code, "");
		await bcrypt.hash(code, 10, async (hasherr, hash) => {
			if (hasherr) throw hasherr;
			newCodeObj.code = hash;
			let newCode = new forgotPassword(newCodeObj);
			await newCode.save();
			err.push("nhap ma code duoc gui cho ban");
			req.flash("error", err);
			res.redirect(`/forgotpassword?email=${email}&code=${hash}`);
		});
	} catch (error) {
		console.log(error);
		res.send(error);
	}
};

exports.postCodeCheck = async (req, res) => {
	let { email, code } = req.query;
	let typedCode = req.body.code;
	let err = [];
	let prePath = `/forgotpassword?email=${email}&code=${code}`;
	let user = await forgotPassword.findOne({ email });
	if (user === null) {
		err.push("khong tim thay user - code check");
		req.flash("error", err);
		res.redirect(prePath);
		return;
	}
	if (new Date().getTime() > user.expire) {
		err.push("het han - code check");
		req.flash("error", err);
		res.redirect("/forgotpassword");
		return;
	}
	bcrypt.compare(typedCode, user.code, async (comerr, result) => {
		if (comerr) {
			console.log(comerr);
			res.send(comerr);
			return;
		}
		if (!result) {
			err.push("ma khong dung");
			req.flash("error", err);
			res.redirect(prePath);
			return;
		}
		res.redirect(
			`/forgotpassword?action=createnewpassword&typedCode=${typedCode}&email=${email}`
		);
	});
	return;
};

exports.postCreateNewPassword = async (req, res) => {
	const { password } = req.body;
	let { code, email } = req.query;
	let forgotData = await forgotPassword.findOne({ email });
	let err = [];
	if (forgotData === null) {
		err.push("khong tim thay user - create pass");
		req.flash("error", err);
		res.redirect("/forgotpassword");
		return;
	}
	bcrypt.compare(code, forgotData.code, async (comerr, result) => {
		if (comerr) {
			res.send(comerr);
			return;
		}
		if (!result) {
			err.push("ma khong dung");
			req.flash("error", err);
			res.redirect("/forgotpassword");
			return;
		}
		await forgotPassword.deleteMany({ email });
		bcrypt.hash(password, 10, async function(hasherr, hash) {
			if (hasherr) {
				console.log(hasherr);
				res.send(hasherr);
				return;
			}
			await users.updateOne({ email }, { password: hash });
		});
		err.push("doi mk thanh cong vui long login");
		req.flash("error", err);
		res.redirect("/login");
	});
	return;
};
