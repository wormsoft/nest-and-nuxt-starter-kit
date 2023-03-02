export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || 'http://localhost:3001/',
    },
  },
})
