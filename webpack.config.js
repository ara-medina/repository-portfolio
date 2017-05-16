var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'sass-loader'],
					publicPath: '/dist'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: ['pug-loader']﻿
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		stats: "errors-only"
	},
	plugins: [
		new HtmlWebpackPlugin({
	      title: 'Repository Project',
	      template: './src/index.pug',
	      minify: {
	      	collapseWhitespace: true
	      },
	      hash: true,
	    }),
	    new ExtractTextPlugin({
	    	filename: 'app.css',
	    	disabled: false,
	    	allChunks: true
	    })
    ]
}