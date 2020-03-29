module.exports = {
	parser: "babel-eslint",
	plugins: ["react-hooks", "react"],
	rules: {
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"no-empty": [
			"warn",
			{
				allowEmptyCatch: true
			}
		],
		"no-console": "off",
		"no-useless-escape": "off",
		"no-useless-catch": "off",
		"no-fallthrough": "off",
		"no-empty": [
			"warn",
			{
				allowEmptyCatch: true
			}
		],
		"no-unreachable": "off",
		"no-constant-condition": "off",
		"no-mixed-spaces-and-tabs": "off"
	},
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			jsx: true
		}
	}
};
