require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s — Doujinshi.info',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/Loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'vue-file-agent/dist/vue-file-agent.css',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/css/main.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vue-gallery.client.js', mode: 'client' },
    { src: '~plugins/vue-file-agent.js', mode: 'client' },
    { src: '~plugins/vue-slicksort.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', {
      materialDesignIconsHRef: '//cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css'
    }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    // Doc: https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // Doc: https://i18n.nuxtjs.org
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          domain: process.env.DOMAIN
        },
        {
          code: 'ja',
          iso: 'ja',
          domain: process.env.DOMAIN_JA
        }
      ],
      detectBrowserLanguage: false,
      differentDomains: true,
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        messages: {
          en: require('./locales/en.json'),
          ja: require('./locales/ja.json')
        }
      }
    }]
  ],
  pwa: {
    manifest: {
      name: 'Doujinshi.info',
      short_name: 'Doujinshi',
      description: 'Doujinshi.info is an information database containing data on self-published works known as doujinshi.',
      lang: 'en'
    },
    workbox: {
      importScripts: ['custom-sw.js']
    }
  },
  auth: {
    strategies: {
      local: {
        _scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 600
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 14
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        },
        autoLogout: false
      }
    },
    redirect: {
      login: '/account/login',
      logout: '/',
      callback: '/account/login',
      home: '/'
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}