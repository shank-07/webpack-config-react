const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPLugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


dotenv.config({});

const { PORT, NODE_ENV } = process.env;

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "../build"),
    },
    mode: NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        port: PORT
    },
    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
                resolve: {
                    extensions: [".js", ".jsx"]
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|gif|jpg|jpeg|png|mp4)$/,
                type: "asset",
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyWebpackPLugin({
            patterns: [
                { from: "./src/assets", to: "assets" },
            ],
        })

    ],
}
