const withSass = require("@zeit/next-sass");
module.exports = withSass({
	cssModules: true,
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
