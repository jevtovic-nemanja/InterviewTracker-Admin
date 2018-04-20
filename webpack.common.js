const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: "./index",
    target: "web",
    resolve: {
        alias: {
            Src: path.resolve(__dirname, "src"),
            Components: path.resolve(__dirname, "src/components"),
            Containers: path.resolve(__dirname, "src/containers"),
            Entities: path.resolve(__dirname, "src/entities"),
            Hocs: path.resolve(__dirname, "src/hocs"),
            Store: path.resolve(__dirname, "src/store"),
            Utils: path.resolve(__dirname, "src/utils")
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "",
        filename: "[name].[hash].js",
        chunkFilename: "js/[name].[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
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
