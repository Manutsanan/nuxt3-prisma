// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'
  },

  devtools: {
    enabled: process.env.NODE_ENV !== 'production'
  },

  devServer: {
    port: 8888,
  },

  ssr: true,

  runtimeConfig: {
    jwtSecret: "",
    public: {
      baseUrl: "",
    }
  },

  app: {
    head: {
      title: 'Nuxt3 + Prisma',
      meta: [
        { name: "referrer", content: "no-referrer-when-downgrade" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
    },
  },

  css: ["~/assets/css/tailwind.css", "sweetalert2/src/sweetalert2.scss", "~/assets/scss/main.scss"],

  modules: ['nuxt-icon', '@nuxtjs/google-fonts'],

  googleFonts: {
    base64: true,
    families: {
      'Kanit': true,
      'Noto Sans JP': true,
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-nesting': {},
    },
  },
})
