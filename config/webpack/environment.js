const { environment } = require("@rails/webpacker");

const rules = environment.loaders;
const ManifestPlugin = environment.plugins.get("Manifest");

rules.delete("nodeModules");

ManifestPlugin.options.writeToFileEmit = true;

module.exports = environment;
