const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('css', resolve('src/style'));
  },

  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: false,
      }),
      new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
      /*
      上面提到 chunkFilename 指定了 chunk 打包输出的名字，那么文件名存在哪里了呢？
      它就存在引用它的文件中。这意味着一个 chunk 文件名发生改变，会导致引用这个 chunk 文件也发生改变。

      runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，
      这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
      */
      runtimeChunk: true,
      splitChunks: {
        /*
        默认 entry 的 chunk 不会被拆分
        因为我们使用了 html-webpack-plugin 来动态插入 <script> 标签，entry 被拆成多个 chunk 也能自动被插入到 html 中，
        所以我们可以配置成 all, 把 entry chunk 也拆分了
        */
        chunks: 'all'
      }
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/style/common.scss'),]
    }
  }
};
