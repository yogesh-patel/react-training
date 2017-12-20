const argv = require('minimist')(process.argv.slice(2));
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

require('dotenv').load({path: require('path').join(__dirname, '.env')});

const isProduction = process.env.ENV === 'production';
const src = path.join(__dirname, 'src');
const plugins = isProduction ?
[
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: `"${process.env.ENV}"`}
    }),
    new webpack.optimize.UglifyJsPlugin({
        compressor: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
        template: path.join('src', 'index-prod.html'),
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        },
        inject: true
    })
]
    :
[
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: `"${process.env.ENV}"`}
    }),

    new HtmlWebpackPlugin({
        template: path.join('src', 'index-dev.html'),
        minify: {
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            collapseWhitespace: true,
            removeComments: true,
            minifyURLs: true,
            minifyCSS: true,
            minifyJS: false
        }
    })

];

// if (isProduction)
//     plugins.push(//For PROD
//       new webpack.optimize.UglifyJsPlugin({
//           compress: {
//               warnings: false
//           },
//           compressor: {
//               screw_ie8: true,
//               warnings: false
//           },
//           mangle: {
//               screw_ie8: true
//           },
//           output: {
//               comments: false,
//               screw_ie8: true
//           }
//       }));

const config = {
    entry: {
        main: [src]
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'

    },

    resolve: {
        root: src,
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },

    devtool: isProduction ? '' : 'source-map',

    devServer: {

        inline: true,
        contentBase: 'dist',
        compress: true,
        proxy: {
            '/api/**': {
                target: 'https://staging-cloud.centricsoftware.com/field-testing-service',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'es2016', 'react']
                }
            },
            {
                test: /\.(gif|png)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.mp4$/,
                loader: 'url?limit=10000&mimetype=video/mp4'
            },
            {
                test: /\.webm$/,
                loader: 'url?limit=10000&mimetype=video/webm'
            }
        ]
    },

    plugins

};

if (isProduction)
    config.externals = {'../../appConstants': 'AppConstants'};

if (argv.watch) config.plugins.push(new DashboardPlugin());

module.exports = config;
