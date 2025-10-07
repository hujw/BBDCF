const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
// 此專案是webpack4
// webpack4 MiniCssExtractPlugin版本不能用太高 這裡用1.3.0
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// webpack4用OptimizeCssAssetsPlugin webpack5要用CssMinimizerPlugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// webpack4用TerserPlugin要用v4版本 這裡用4.2.3
const TerserPlugin = require('terser-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/BioBank' : '/',

  // https://cli.vuejs.org/config/#productionsourcemap
  productionSourceMap: false,

  // 預留proxy
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/bitgin-api': {
        target: 'https://bitgin.net',
        changeOrigin: true,
        pathRewrite: {
          '^/bitgin-api': '/'
        }
      }
    }
  },

  // https://cli.vuejs.org/config/#css-extract
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      sass: {
        additionalData: "@import '~@/assets/scss/vuetify/variables'"
      },
      scss: {
        additionalData: "@import '~@/assets/scss/vuetify/variables';"
      }
    }
  },
  // configureWebpack: {
  //   plugins: [
  //     // gzip 壓縮文本
  //     new CompressionPlugin({
  //       filename: '[path][base].gz',
  //       test: /\.js$|\.html$|\.css/, // 匹配文件名
  //       threshold: 10240, // 對超過10kb的數據進行壓縮
  //       deleteOriginalAssets: false // 是否刪除原文件 (true整個網頁會噴掉 要用false)
  //     })
  //   ]
  // },
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /\.(sa|sc|c)ss$/,
  //         use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader','sass-loader']
  //       }
  //     ]
  //   }
  // },

  chainWebpack: (config) => {
    // Remove the following lines to add Vue Prefetch and Preload on index.html
    // https://cli.vuejs.org/guide/html-and-static-assets.html#disable-index-generation
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.module.rule('svg').exclude.add(resolve('src/assets/images/svg')).end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/images/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      });

    // 分割公用模組
    config.optimization.splitChunks({
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        omlib: {
          test: /[\\/]libs[\\/]/,
          name: 'omlib',
          chunks: 'all'
        }
      }
    });

    // css 壓縮
    // config
    //   .plugin('miniCssExtractPlugin')
    //   .use(new MiniCssExtractPlugin())

    // css 壓縮
    config.optimization.minimizer('optimizeCssAssetsPlugin').use(
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    );

    // js 壓縮
    config.optimization.minimizer('terserPlugin').use(
      new TerserPlugin({
        terserOptions: {
          compress: true
        },
        parallel: true
      })
    );

    // gzip 壓縮
    config.plugin('compressionPlugin').use(
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[path][base].gz',
        test: /\.(js|html|css|svg)$/i, // 匹配文件名
        threshold: 10240, // 對超過10kb的數據進行壓縮,
        minRatio: 0.8, // 只有壓縮率比這個值小的資源才會被處理
        deleteOriginalAssets: false // 是否刪除原文件 (true整個網頁會噴掉 要用false)
      })
    );

    // 壓縮圖片
    config.module
      .rule('images')
      .test(/\.(png|jpg|jpeg|gif)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        // jpeg
        mozjpeg: { progressive: true, quality: 30 },
        // png
        optipng: { enabled: false },
        // png
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        // gif
        gifsicle: { interlaced: false }
      })
      .end();
  },

  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: ['vue-echarts', 'resize-detector', 'vuetify']
};
