const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
                test: /(\.css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]--[hash:base64:5]"
                        }
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
    output: {
        filename: "[name].[hash].js"
    },
    devServer: {
        contentBase: __dirname + "/src"
    }
});