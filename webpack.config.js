
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildDir = `${__dirname}/build`;
const outputFilename = '[name].js';
const outputCSSFilename = '[name].css';
const publicPath = ''

module.exports = {
	entry: {
		main: './app.js',
	},
	output: {
		path: buildDir,
		publicPath,
		filename: outputFilename,
		chunkFilename: outputFilename,
	},
	plugins: [
		new ExtractTextPlugin({
			filename: outputCSSFilename,
			allChunks: true,
		}),
		new HtmlWebpackPlugin({
			title: 'Sample React Application',
			template: 'index.ejs',
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				exclude: /(node_modules|bower_components)/,
				loader: ExtractTextPlugin.extract({
					use: ['css-loader']
				})
			},
		],
	}
};
