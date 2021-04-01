process.env.NODE_ENV = process.env.NODE_ENV || "development";

const merge = require("webpack-merge");
const client = require("./client");
const server = require("./server");

const clientConfig = merge(client, {
    mode: "development",
});

const serverConfig = merge(server, {
    mode: "development",
});

module.exports = [clientConfig, serverConfig];
