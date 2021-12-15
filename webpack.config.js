const path = require('path');

module.exports = {
	entry: './lib/index.ts',
	module: {
		rules: [{
			test: /\.ts?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		}, ],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			"crypto": false,
			"path": false,
			"crypto-browserify": require.resolve('crypto-browserify'),
			"path": require.resolve("path-browserify")
		}
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'browser'),
	},
};