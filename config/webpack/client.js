const environment = require('./environment');
const devBuild = process.env.NODE_ENV === 'development';

if (devBuild) {
  environment.loaders
    .get('sass')
    .use.find((item) => item.loader === 'sass-loader').options.sourceMapContents = false;
}

module.exports = environment;