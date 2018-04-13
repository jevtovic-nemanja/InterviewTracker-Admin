const path = require("path");

module.exports = {
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
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        contentBase: __dirname + "/src"
    },
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                loaders: ["style-loader", "css-loader"]
            }
        ]
    }
};
