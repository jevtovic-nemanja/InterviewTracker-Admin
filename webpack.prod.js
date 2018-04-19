const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [
            {
                test: /(\.css)$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /(\.css)$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    }
});