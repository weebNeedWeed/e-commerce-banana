const withSass = require("@zeit/next-sass");
const env = process.env;
module.exports = withSass({
	devIndicators: {
		autoPrerender: false
	},
	cssLoaderOptions: {
		localIdentName: "[local]"
	},
	env: {
		GOOGLE_SITE_KEY: process.env.GOOGLE_SITE_KEY
	}
});
