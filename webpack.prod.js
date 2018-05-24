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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"
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