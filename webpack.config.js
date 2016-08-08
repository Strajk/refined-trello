const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['', '.js', '.jsx', '.styl'],
	},
	entry: {
		app: './src/index'
	},
	devtool: 'source-map',
	output: {
		path: 'dst',
		publicPath: '/',
		filename: 'index.js',
	},
	plugins: [
		new AssetsPlugin({ path: 'dst' }),
		new ExtractTextPlugin('index.css'),
		new CopyWebpackPlugin([
			{from: 'assets'},
		]),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
				},
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('css!stylus'),
			}
		]
	}
};
