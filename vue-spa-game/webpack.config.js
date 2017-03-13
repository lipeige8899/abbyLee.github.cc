// const 关键字用在那些永远不会改变的变量申明， let 用在其他变量申明上
const {resolve,join}=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

// context这是entry配置项的根目录（绝对路径）
// entry 包的入口 如果你传入一个字符串，这个字符串作为主模块的启动点
	// 如果传入一个数组，数组中所有模块都会启动，但最后一个会被导出
// output影响编译输出的配置项 告诉webpack怎么把编译后的文件写入磁盘。
	// 多入口文件时 [name]会被块名替换掉
	// ［hash］会被编译的hash替换掉 ［chunkhash］会被块的hash替换掉
// module
	//  test 正则，必须满足的条件
	//  exclude:排除的条件
	//  include：要用loader转换的导入文件的路径数组
	//  loader 一个用感叹号隔开loader的字符串
	//  loaders一个loader字符串的数组
// resolve 影响模块的解决方案
// 	extensions 一个包含模块扩展名的数组
// 	alias用其他模块或者路径替换一个模块

module.exports={
	entry:{
		index:'./js/index.js'
	},
	output:{
		filename:'[name].[hash].bundle.js',
		path:resolve(__dirname,'build')
	},
	devtool:'#eval-source-map',
	devServer:{
		contentBase:join(__dirname,'build'),
		compress:false,
		port:8888,
		host:'0.0.0.0',
		hot:true,
		inline:true
	},
	module:{
		rules:[{
			test:/\.vue$/,
			use:[{
				loader:'vue-loader',
				options:{
					loaders:{
						js:'babel-loader?{"presets":["es2015"],"plugins":["transform-object-rest-spread"]}',
						css:'vue-style-loader!css-loader'
					}
				}
			}],
			exclude:/node_modules/
		},{
			test:/\.js$/,
			use:[{
				loader:'babel-loader',
				options:{
					presets:['es2015'],
					plugins:['transform-object-rest-spread']
				}
			}],
			exclude:/node_modules/
		},{
			test:/\.css$/,
			loader:'style-loader!css-loader'
		},{
			test:/\.(png)$/,
			use:['file-loader']
		}]
	},
	resolve:{
		extensions:['.js','.vue'],
		alias:{
			vue:resolve(__dirname,'node_modules','vue','dist','vue.min.js')
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			inject:'body',
			template:'index.html_vm',
			favicon:'img/favicon.ico',
			hash:false
		})
	]
}