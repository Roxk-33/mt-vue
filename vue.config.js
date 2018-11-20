const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('css', resolve('src/assets/style'));
    config.resolve.alias.set('src', resolve('src'));
  },

  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: false,
      }),
    ],
  },

  lintOnSave: undefined
};
