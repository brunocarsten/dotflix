// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            primary: '#0F172A',
            secondary: '#1E293B',
            light: '#F8FAFC',
            muted: '#94A3B8',
            success: '#22C55E',
            danger: '#E11D48',
          },
        },
      },
    },
  },
  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY,
    access_token: process.env.ACCESS_TOKEN,
  },
  nitro: {
    externals: {
      inline: ['vue'],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['vue']
    }
  }
})