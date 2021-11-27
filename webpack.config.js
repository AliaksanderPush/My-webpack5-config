let mode = 'development'; 
if (process.env.NODE_ENV === 'production')
mode = 'production'; 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   context:path.resolve(__dirname, 'src'), 
   mode: mode,  
   entry: {
        main: path.resolve(__dirname, './src/js/index.js'), 
    },
   output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]"
    },
    //devtool: 'sourse-map',
     plugins: [
        new HtmlWebpackPlugin({
           template: path.resolve(__dirname, './src/index.html'), // шаблон
                              
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
           filename:'[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
               test: /\.(html)$/,
               use: 'html-loader',
            },

            {
               test: /\.(css)$/,
               use: [
                  (mode === 'development') ? 'style-loader': MiniCssExtractPlugin.loader,
                'css-loader',
                {loader: "postcss-loader"},
                "sass-loader",
               ],
            },
          
            {
               test: /\.(woff(2)?|eot|ttf|otf|)$/,
               type: 'asset/inline',
            },
             {
               test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
               type: 'asset/resource',
             },
             {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
               
             },
           
        ],
    }

}