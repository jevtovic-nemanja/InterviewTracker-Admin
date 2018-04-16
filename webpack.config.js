const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: __dirname + "/src/index",
    target: "web",
    resolve: {
        alias: {
            Src: path.resolve(__dirname, "src"),
            Components: path.resolve(__dirname, "src/components"),
            Containers: path.resolve(__dirname, "src/containers"),
            Entities: path.resolve(__dirname, "src/entities"),
            Store: path.resolve(__dirname, "src/store"),
            Utils: path.resolve(__dirname, "src/utils")
        }
    },
    output: {
        path: path.resolve(__dirname, "src/dist"),
        filename: "bundle.js",
        publicPath: ""
    },
    devServer: {
        contentBase: __dirname + "/src"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body"
        })
    ]
};
