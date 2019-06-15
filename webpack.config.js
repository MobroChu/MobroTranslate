const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


const { NODE_ENV = 'development' } = process.env;
const IS_DEV = NODE_ENV !== 'production';

const resolve = dir => path.resolve(__dirname, dir);
const addHash = fname => {
    var r = fname;
    if (IS_DEV) return r;
    const name = "[name]";
    const index = fname.lastIndexOf(name);
    if (index !== -1) {
        const suffix = fname.substring(index + name.length);
        let hash = 'hash'
        if (suffix === '.js') {
            hash = 'chunkhash'
        } else if (suffix === '.css') {
            hash = 'contenthash'
        }
        r = fname.replace(name + suffix, `${name}.[${hash}:8]${suffix}`);
    }
    return r;
};

config = {
    mode: NODE_ENV,
    entry: {
        'background': './src/js/background.js',
        'popup': './src/js/popup.js',
        'vendor.jquery': './src/js/lib/jquery.min.js',
        'vendor.md5': './src/js/lib/md5.js'
    },
    output: {
        filename: 'js/[name].js',
        path: resolve('public'),
        publicPath: 'local'
    },
    module: {
        rules: [{
            test: /.+\.js$/g,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.less|\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                }
            },
            {
                loader: 'less-loader',
                options: {
                    noIeCompat: true
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: `images/[name]-[hash:5].[ext]`
                }
            }, {
                loader: 'url-loader',
                options: {
                    limit: 1024 * 8
                }
            }]
        }]
    },
    resolve: {
       extensions: ['.js', '.less'],
       alias: {
           '@': resolve('src')
       }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: addHash('css/[name].css')
        }),
        new HtmlWebpackPlugin({
            filename: 'background.html',
            template: resolve('src/template/background.html'),
            chunks: ['vendor.jquery', 'vendor.md5', 'background']
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: resolve('src/template/popup.html'),
            chunks: ['vendor.jquery', 'popup']
        }),
        new CopyWebpackPlugin([{
            from: resolve('src/manifest.json'),
            to: 'manifest.json'
        }, {
            from: resolve('src/images/*.*'),
            to: 'images/'
        }])
    ]
}

module.exports = config;