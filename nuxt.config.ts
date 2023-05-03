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
    // pageTransition: {
    //   name: "page",
    //   mode: "out-in",
    // },
  },
});
