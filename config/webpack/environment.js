const { environment } = require("@rails/webpacker");

const rules = environment.loaders;
const ManifestPlugin = environment.plugins.get("Manifest");

rules.delete("file");
rules.delete("css");
rules.delete("sass");
rules.delete("moduleCss");
rules.delete("moduleSass");
rules.delete("nodeModules");

ManifestPlugin.options.writeToFileEmit = true;

module.exports = environment;
