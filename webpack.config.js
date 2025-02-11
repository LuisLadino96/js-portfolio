const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
//const {CleanWebPackPlugin} = require('clean-webpack-plugin');


module.exports = {
   entry:'./src/index.js',
   output : {
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js',
       clean: true,
   },
   resolve: {
       extensions: ['.js'],
       alias: {
           '@utils': path.resolve(__dirname, 'src/utils'),
           '@templates' : path.resolve(__dirname, 'src/templates'),
           '@styles' : path.resolve(__dirname, 'src/styles'),
           '@images' : path.resolve(__dirname, 'src/assets/images'),
       }
   },
   module: {
       rules: [
           {
       test: /\.m?js$/,
       exclude: /node_modules/,
       use: {
           loader: 'babel-loader'
       }
    },
    {
        test :/\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
    ],
    },
    {
        test: /\.png/,
        type: 'asset/resource'
    }
    ]
},
plugins : [
    new HtmlWebPackPlugin({
        inject: true,
        template: './public/index.html',
        filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns : [
            {
                from: path.resolve( __dirname, "src","assets/images"),
                to: "assets/images"
            }
        ]
    }),
    new Dotenv(),
    //new CleanWebPackPlugin(),
    
]
}