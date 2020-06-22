process.env.NODE_ENV = process.env.NODE_ENV || "production";

const clientEnvironment = require("./client");
const serverConf = require("./server");
const merge = require("webpack-merge");

const clientConfig = merge(clientEnvironment.toWebpackConfig(), {
    mode: "production",
});

const serverConfig = merge(serverConf, {
    mode: "production",
    optimization: {
        minimize: true,
    },
});

module.exports = [clientConfig, serverConfig];
