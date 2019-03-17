const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
// const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default;
const PrepackWebpackConfig = {
  test: '/.(js|vue)$/i',
};

function resolve(dir) {
  return path.join(__dirname, dir);
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: ['https://cdn.jsdelivr.net/npm/vant@1.6.9/lib/index.css'],
    js: ['https://api.map.baidu.com/api?v=2.0&ak=gql7G3189x9UnKhoAya6yCfdxZz7CsQX'],
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@1.6.9/lib/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.9/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vant@1.6.9/lib/vant.min.js',
      'https://api.map.baidu.com/api?v=2.0&ak=gql7G3189x9UnKhoAya6yCfdxZz7CsQX',
      'https://cdn.jsdelivr.net/npm/better-scroll@1.13.0/dist/bscroll.min.js',
    ],
  },
};
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  vant: 'vant',
  BScroll: 'BScroll',
};
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('css', resolve('src/style'));
    config.resolve.alias.set('vendors', resolve('src/vendors'));
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
  configureWebpack: config => {
    const _config = {};
    _config.plugins = [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: false,
      }),
      new webpack.ProgressPlugin(function handler(percentage, msg) {
        if (percentage == 0) {
          console.log('开始编译');
          startTime = new Date();
        }
        if (percentage == 1) {
          console.log('结束编译');
          const endTime = new Date();
          console.info(`耗时:${parseInt((endTime - startTime) / 1000)}s`);
        }
      }),
      // new BundleAnalyzerPlugin(),
      new PrepackWebpackPlugin(PrepackWebpackConfig),
      new webpack.HashedModuleIdsPlugin(),
      new UglifyJsPlugin(),
      // new SkeletonWebpackPlugin({
      //   webpackConfig: {
      //     entry: {
      //       app: resolve('./src/skeleton/entry-skeleton.js'),
      //     },
      //   },
      //   quiet: true,
      //   minimize: true,
      //   router: {
      //     mode: 'hash',
      //     routes: [
      //       {
      //         path: '/shop/list',
      //         skeletonId: 'skeleton-shop-list',
      //       },
      //     ],
      //   },
      // }),
      // new BundleAnalyzerPlugin(),
    ];
    _config.optimization = {
      runtimeChunk: true,
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true,
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: resolve('node_modules'),
            name: 'vendors',
            minSize: 30000,
            minChunks: 1,
            chunks: 'initial',
            priority: 1, // 该配置项是设置处理的优先级，数值越大越优先处理
          },
        },
      },
    };
    _config.output = {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash:5].chunk.js',
    };
    if (isProd) {
      _config.externals = externals;
    }

    return _config;
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [resolve('src/style/common.scss')],
    },
  },
};
