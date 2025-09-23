// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
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
});
