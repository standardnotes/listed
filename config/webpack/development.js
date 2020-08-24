process.env.NODE_ENV = process.env.NODE_ENV || "development";

const clientEnvironment = require("./client");
const serverConfig = require("./server");
const merge = require("webpack-merge");

const clientConfig = merge(clientEnvironment.toWebpackConfig(), {
    mode: "development",
});

module.exports = [clientConfig, serverConfig];
