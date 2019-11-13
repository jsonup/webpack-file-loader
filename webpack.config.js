const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.png$/,
			use: {
				loader: 'file-loader'
			} 
		}]
	},
	output: {
		filename: 'xishu.js',
		path: path.resolve(__dirname, 'dist')
	}
}
