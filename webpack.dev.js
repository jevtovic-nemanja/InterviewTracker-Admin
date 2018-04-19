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
                    "css-loader"
                ]
            }
        ]
    },
    devServer: {
        contentBase: __dirname + "/src"
    }
});