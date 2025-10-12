// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Runtime config: private values are available server-side via useRuntimeConfig()
  runtimeConfig: {
    // public keys are exposed to the client via useRuntimeConfig().public
    public: {
      supabaseUrl: process.env.SUPABASE_URL || "",
    },
    // private keys (server-only)
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  },
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
