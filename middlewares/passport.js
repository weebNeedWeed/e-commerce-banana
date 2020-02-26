const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const users = require("./../models/user");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	users
		.findById(id)
		.then(function(user) {
			done(null, user);
		})
		.catch((err) => console.log(err));
});

const CustomStrategy = new LocalStrategy((email, password, done) => {
	users.findOne({ email }, function(err, user) {
		if (err) return done(err);
		if (user.password !== password || !password)
			return done(null, false, { message: "sai mk" });
		if (!user) return done(null, false, { message: "sai tk" });
		return done(null, user);
	});
});

module.exports = passport.use(CustomStrategy);
