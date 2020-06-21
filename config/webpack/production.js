process.env.NODE_ENV = process.env.NODE_ENV || "production";

const clientEnvironment = require("./client");
const serverConf = require("./server");
const merge = require("webpack-merge");

const clientConfig = merge(clientEnvironment.toWebpackConfig(), {
    mode: "development",
});

const serverConfig = merge(serverConf, {
    mode: "production",
});

module.exports = [clientConfig, serverConfig];
