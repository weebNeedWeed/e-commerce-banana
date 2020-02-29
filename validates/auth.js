exports.loginValidate = function(req, res, next) {
	const err = [];
	const { email, password } = req.body;
	if (!email) err.push("thieu email");
	if (!password) err.push("thieu mk");
	if (err.length > 0) {
		req.flash("error", err);
		res.redirect("/login");
		return;
	}
	next();
};
exports.registerValidate = function(req, res, next) {
	const err = [];
	const { email, password, retypePassword } = req.body;
	if (!email) err.push("thieu email");
	if (!password) err.push("thieu pas");
	if (!retypePassword) err.push("thieu retype");
	if (password !== retypePassword) err.push("pass !== retype");
	if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		err.push("email khong hop le");
	if (password.length < 10) err.push("pass >= 10");
	if (
		!(
			password.match(/[A-Z]+/g) &&
			password.match(/[a-z]+/g) &&
			password.match(/[0-9]+/g)
		)
	)
		err.push("password A-Z a-z 0-9");
	if (err.length > 0) {
		req.flash("error", err);
		res.redirect("/register");
		return;
	}
	next();
};
