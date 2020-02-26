const express = require("express");

const next = require("next");

const expressSession = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(expressSession);

const mongoose = require("mongoose");

const passport = require("passport");

require("dotenv").config();

const { DATABASE_URL } = process.env;

// server config

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// define session store

const myStore = new MongoDBStore({
	uri: DATABASE_URL,
	collection: "session"
});

myStore.on("error", (err) => {
	console.log(err);
});

// connect db(auto retry)

function connectWithRetry() {
	mongoose.connect(
		DATABASE_URL,
		{ useUnifiedTopology: true, useNewUrlParser: true },
		(err) => {
			if (err) {
				console.log("connect failed auto retry after 5 seconds");
				setTimeout(connectWithRetry, 5000);
			} else console.log("connect to mongo success");
		}
	);
}
connectWithRetry();

app.prepare().then(() => {
	const server = express();

	// session config

	server.use(
		expressSession({
			cookie: { maxAge: 1500000, expires: 1500000 },
			secret: "lmao",
			saveUninitialized: true,
			resave: true,
			rolling: true,
			store: myStore
		})
	);

	// use passport middleware
	server.use(passport.initialize());
	server.use(passport.session());

	const p = require("./middlewares/passport");
	server.get(
		"/api",
		p.authenticate("local", {
			successReturnToOrRedirect: "/",
			failureRedirect: "/login"
		})
	);
	server.all("*", (req, res) => {
		return handle(req, res);
	});
	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});
