// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  devServer: {
    port: 3000,
    host: "0.0.0.0", // do not put localhost (only accessible from the host machine)
  },
  nitro: {
    experimental: {
      database: true,
    },
    database: {
      myDB: {
        connector: "sqlite", // Use SQLite as the database,
        options: { name: "mydbfile" },
      },
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
});
