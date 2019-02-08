const devMode = process.env.NODE_ENV !== 'production'

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {

  entry: './src/main.js',
  //entry: ['@babel/polyfill', './src/main.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/tpl/html.html',
      //template: require("html-loader!./src/tpl/index.html"),
      content: "bobanxx",
      filename: 'index.html',
      hash: true,
    }),
    // new HtmlWebpackPlugin({
    //   template: './src/tpl/html.html',
    //   content: 'content example',
    //   hash: true,
    //   filename: 'example.html'
    // }),
  ],

  externals: {
    //jquery: 'jQuery'
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          (!!devMode) ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test:/\.scss$/,
        use:[
          (!!devMode) ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: { // https://github.com/babel/babel-loader
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "targets": {
                  "browsers": [
                    "last 2 versions",
                    "ie >= 10"
                  ],
                },
                "debug": false,
              }]
            ],
          }
        }
      },
    ],

  },

}


const configDev = {

  mode: 'development',

  devtool: 'source-map',

  devServer: {
    host: '0.0.0.0',
    port: 9900,
    open: true,
    hot: true,
    hotOnly: true,
    inline: true,
  },

}


const configProd = {

  mode: 'production',

  devtool: false,

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ]

}


const ccc = merge(config, (!!devMode) ? configDev : configProd, {});
console.log(ccc);

module.exports = ccc;
