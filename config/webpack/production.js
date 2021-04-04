process.env.NODE_ENV = process.env.NODE_ENV || "production";

const merge = require("webpack-merge");
const clientEnvironment = require("./client");
const serverConf = require("./server");

clientEnvironment.splitChunks();

const clientConfig = merge(clientEnvironment.toWebpackConfig(), {
    mode: "production",
    output: {
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        path: clientEnvironment.config.output.path,
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
            },
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
