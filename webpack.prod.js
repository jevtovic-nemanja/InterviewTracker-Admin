const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.css)$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /(\.css)$/,
                include: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new BundleAnalyzerPlugin()
    ],
    output: {
        filename: "[name].[chunkhash].js"
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: true
    }
});