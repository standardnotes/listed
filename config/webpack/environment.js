const { environment } = require("@rails/webpacker");

// const sassResources = ["./client/app/assets/styles/*.scss"];
const aliasConfig = require("./alias.js");
const rules = environment.loaders;
const sassLoader = rules.get("sass");
const ManifestPlugin = environment.plugins.get("Manifest");

/* sassLoader.use.push({
    loader: "sass-resources-loader",
    options: {
        resources: sassResources,
    },
}); */

environment.config.merge(aliasConfig);

sassLoader.use[1].options.modules = true;

rules.delete("nodeModules");
rules.delete("moduleCss");
rules.delete("moduleSass");

ManifestPlugin.options.writeToFileEmit = true;

module.exports = environment;
