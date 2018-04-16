const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
});