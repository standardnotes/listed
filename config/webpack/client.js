const merge = require("webpack-merge");
const environment = require("./environment");

const clientConfig = merge(environment.toWebpackConfig(), {
    output: {
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        path: environment.config.output.path,
    },
});

module.exports = clientConfig;
