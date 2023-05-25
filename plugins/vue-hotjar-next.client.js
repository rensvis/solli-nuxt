import VueHotjar from "vue-hotjar-next";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueHotjar, {
    id: 3507621,
    isProduction: process.env.IS_PRODUCTION,
  });
});
