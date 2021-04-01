const { environment } = require("@rails/webpacker");

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

module.exports = environment;
