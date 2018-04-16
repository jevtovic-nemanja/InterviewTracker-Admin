const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge(common, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
});