// import colors from 'vuetify/es5/util/colors'
import CompressionPlugin from 'compression-webpack-plugin';

export default {
  publicRuntimeConfig: {
    VUE_APP_WEB_URL: process.env.VUE_APP_WEB_URL,
    VUE_APP_IPFS_URL: process.env.VUE_APP_IPFS_URL,
    VUE_APP_REQUEST_API_URL: process.env.VUE_APP_REQUEST_API_URL,
    VUE_APP_REQUEST_TIMEOUT: process.env.VUE_APP_REQUEST_TIMEOUT
  },

  env: {
    VUE_APP_WEB_URL: process.env.VUE_APP_WEB_URL,
    VUE_APP_IPFS_URL: process.env.VUE_APP_IPFS_URL,
    VUE_APP_REQUEST_API_URL: process.env.VUE_APP_REQUEST_API_URL,
    VUE_APP_REQUEST_TIMEOUT: process.env.VUE_APP_REQUEST_TIMEOUT
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - 台灣人體生物資料庫學會',
    title: 'Biobank',
    htmlAttrs: {
      lang: 'zh-TW'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '隨著醫學與科技的進步，台灣地區人口結構逐漸老化，雖然平均壽命延長，但各種慢性疾病仍佔據十大死因諸項。若得以更加瞭解國人生活型態與環境因子，以及種族基因上之確切關連，並設法改變國人危險行為，則必有益於國人健康、預防疾病，俾使人人得而善終。台灣人體生物資料庫結合生活習慣、環境因子、臨床醫學與生物標幟等資訊，建立專屬於台灣本土之人體生物資庫，為生物醫學研究搜集龐大的生物檢體與健康資訊，專門提供國內學者申…'
        // content:
        //   '台灣人體生物資料庫結合生活習慣、環境因子、臨床醫學與生物標幟等資訊，建立專屬於台灣本土之人體生物資庫，為生物醫學研究搜集龐大的生物檢體與健康資訊。',
      },

      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;900&amp;display=swap',
      // },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/_global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-slick', mode: 'client' },
    { src: '~/plugins/vue-svg-inline-plugin.client.js' },
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/vuex-pathify.js', mode: 'client' },
    { src: '~/plugins/vuex-persist', mode: 'client' },
    { src: '~/plugins/route-guard', mode: 'client' },
    { src: '~/plugins/zxcvbn', mode: 'client' },
    { src: '~/plugins/vue-dompurify-html', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    // 字體設置
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Noto Sans TC': {
            wght: [100, 300, 400, 500, 700, 900]
          }
        },
        subsets: ['latin'],
        display: 'swap',
        preload: true,
        preconnect: false,
        prefetch: false,
        download: false,
        base64: false
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-webfontloader',
    '@nuxtjs/moment',
    '@nuxtjs/axios',
    [
      'vue-toastification/nuxt',
      {
        timeout: 3000,
        draggable: false,
        position: 'bottom-right'
      }
    ],
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.VUE_APP_REQUEST_API_URL, // Used as fallback if no runtime config is provided
    timeout: process.env.VUE_APP_REQUEST_TIMEOUT
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: false
    },
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#B88A77',
          secondary: '#F0E9E0',
          success: '#33D067',
          danger: '#FF5353',
          warning: '#FF8A48',
          info: '#5e5ce6',
          dark: '#242939',
          black: '#242939',
          color: '#0F3460',
          grey: '#B1AEAE',
          greyLighten: '#F8F8F8',
          greenLighten: '#C1D4C1',
          blueDarken: '#383E5F',
          background: '#F7F5F3',
          subGroupBtn: '#a0b9c8'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/nuxt/',
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            // cacheGroupKey here is `commons` as the key of the cacheGroup
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight((item) => item);
              const allChunksNames = chunks.map((item) => item.name).join('~');
              return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
            },
            chunks: 'all',
            enforce: true,
            minSize: 100000
          }
        }
      }
    },

    // plugins: [
    //   new CompressionPlugin({
    //     filename: '[path][base].gz',
    //     test: /\.js$|\.html$|\.css/, // 匹配文件名
    //     threshold: 10240, // 對超過10kb的數據進行壓縮
    //     deleteOriginalAssets: false, // 是否删除原文件
    //   }),
    // ],

    cache: true,
    // hardSource: true, // 暫時不用，compiler會一直噴錯，需要不斷手動刪除node_modules底下的.cache
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyElements: true
      }
    },
    extend(config, { isServer }) {
      if (isServer) {
        config.externals = [];
      }

      // gzip 壓縮
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          filename: '[path][base].gz',
          test: /\.(js|html|css)$/i, // 匹配文件名
          threshold: 10240, // 對超過10kb的數據進行壓縮
          minRatio: 0.8, // 只有壓縮率比這個值小的資源才會被處理
          deleteOriginalAssets: false // 是否刪除原文件 (true整個網頁會噴掉 要用false)
        })
      );

      // 壓縮圖片
      config.module.rules.forEach((rule) => {
        // console.log('config.module.rules', config.module.rules)
        if (rule.test.toString() === '/\\.(png|jpe?g|gif|svg|webp|avif)$/i') {
          rule.use = [
            {
              loader: 'url-loader',
              options: {
                // 重要 esModule和name一定要這樣設定 否則img src會有問題
                esModule: false,
                name: '[path][name].[ext]',
                limit: 1000
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ];
          delete rule.loader;
          delete rule.options;
        }
      });
    },
    transpile: [/^v-snackbars$/],
    terser: {
      // https://github.com/terser/terser#compress-options
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
};
