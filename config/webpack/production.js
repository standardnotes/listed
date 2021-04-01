process.env.NODE_ENV = process.env.NODE_ENV || "production";

const merge = require("webpack-merge");
const client = require("./client");
const server = require("./server");

const clientConfig = merge(client, {
    mode: "production",
    optimization: {
        minimize: true,
    },
});

const serverConfig = merge(server, {
    mode: "production",
    optimization: {
        minimize: true,
    },
});

module.exports = [clientConfig, serverConfig];
