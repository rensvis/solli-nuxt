// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@formkit/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@element-plus/nuxt",
    "@nuxt/content",
    "nuxt-gtag",
  ],
  css: [
    "~/assets/css/main.scss",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    // "~/plugins/fontawesome.js",
    { src: "~/plugins/fontawesome.js", mode: "client" },
    { src: "~/plugins/vercel.ts", mode: "client" },
    "~/plugins/auto-animate.js",
    "~/plugins/vue-timeago.js",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "nl",
      },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "page",
      mode: "default",
      // mode: "out-in",
    },
  },
  formkit: {
    configFile: "formkit.config.ts",
  },
  gtag: {
    id: "G-Q6J68JPB1E",
  },
});
