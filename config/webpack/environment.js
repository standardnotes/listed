const { environment } = require("@rails/webpacker");

const webpack = require("webpack");

const devBuild = process.env.NODE_ENV === "production" ? "production" : "development";

const rules = environment.loaders;
const ManifestPlugin = environment.plugins.get("Manifest");

const sassResources = ["./client/app/assets/styles/vars.scss", "./client/app/assets/styles/mixins.scss"];
const sassLoader = rules.get("sass");

sassLoader.use = sassLoader.use.filter((item) => item.loader !== "postcss-loader");
sassLoader.use.push({
    loader: "sass-resources-loader",
    options: {
        resources: sassResources,
    },
});

rules.delete("css");
rules.delete("moduleCss");
rules.delete("moduleSass");
rules.delete("nodeModules");

ManifestPlugin.options.writeToFileEmit = true;

environment.config.optimization = {
    splitChunks: {
        chunks: "all",
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                enforce: true,
            },
        },
    },
};

environment.plugins.insert(
    "DefinePlugin",
    new webpack.DefinePlugin({
        TRACE_TURBOLINKS: devBuild === "development",
        "process.env": {
            NODE_ENV: devBuild,
        },
    }),
    { after: "Environment" },
);

module.exports = environment;
