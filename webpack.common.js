const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineSourcePlugin = require("html-webpack-inline-source-plugin");

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
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
                test: /(\.png)$/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body",
            inlineSource: "runtime~.+\\.js"
        }),
        new InlineSourcePlugin()
    ]
};
