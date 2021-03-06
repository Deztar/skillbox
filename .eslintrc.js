module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'linebreak-style': 0,
		'no-tabs': 0,
		'indent': 0,
		'object-shorthand': 1,
		'comma-dangle': 0,
		'implicit-arrow-linebreak': 0,
		'function-paren-newline': 0
	},
};
