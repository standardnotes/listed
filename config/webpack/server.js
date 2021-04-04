const merge = require("webpack-merge");

const environment = require("./environment");

const serverConfig = merge(environment.toWebpackConfig(), {
    mode: "development",
    target: "web",
    entry: "./client/app/startup/serverRegistration.js",
    output: {
        filename: "server-bundle.js",
        path: environment.config.output.path,
        globalObject: "this",
    },
    optimization: {
        minimize: false,
    },
});

serverConfig.plugins = serverConfig.plugins.filter((plugin) => plugin.constructor.name !== "WebpackAssetsManifest");

module.exports = serverConfig;
