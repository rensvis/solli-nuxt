// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  plugins: ["~/plugins/fontawesome.js"],
  app: {
    head: {
      htmlAttrs: {
        lang: "nl",
      },
      link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
    },
    // pageTransition: {
    //   name: "page",
    //   mode: "out-in",
    // },
  },
});
