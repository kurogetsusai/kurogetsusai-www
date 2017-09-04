const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
	build: path.resolve(__dirname, 'build'),
	source: path.resolve(__dirname, 'src')
};

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: paths.build
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react']
					}
				}
			},
			{
				test: /\.x?html$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: paths.source
					}
				}
			},
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'sass-loader'
					]
				})
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	],
	devtool: 'source-map',
	devServer: {
		contentBase: paths.build,
		compress: true
	}
};
