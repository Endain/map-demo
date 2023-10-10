const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: [
        './src/index.ts',
        './src/index.scss'
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: "index.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ],
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {outputPath: './', name: '[name].css'}
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};