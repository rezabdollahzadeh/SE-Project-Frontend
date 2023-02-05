module.export = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		project: "./tsconfig.json",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"no-empty-function": "off",
		"import/no-extraneous-dependencies": "off",
		"@typescript-eslint/no-empty-function": "off",
		"react/no-unused-prop-types": 2,
	},
};
