process.env.NODE_ENV = process.env.NODE_ENV || "production";

const clientEnvironment = require("./client");
const serverConf = require("./server");
const merge = require("webpack-merge");

clientEnvironment.splitChunks();

const clientConfig = merge(clientEnvironment.toWebpackConfig(), {
    mode: "production",
    output: {
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        path: clientEnvironment.config.output.path
    },
    optimization: {
        splitChunks: {
            name: "vendor",
        },
    },
});

const serverConfig = merge(serverConf, {
    mode: "production",
    optimization: {
        minimize: true,
    },
});

module.exports = [clientConfig, serverConfig];
