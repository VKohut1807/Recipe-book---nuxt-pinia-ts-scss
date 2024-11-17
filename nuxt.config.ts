// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  pages: true,
  components: true,
  css: ["@/assets/styles/global/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
          additionalData: ``,
        },
      },
    },
  },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Lato: {
            wght: [300, 400, 700],
            ital: [300],
          },
        },
      },
    ],
  ],
  imports: {
    dirs: ["./stores"],
  },
});
