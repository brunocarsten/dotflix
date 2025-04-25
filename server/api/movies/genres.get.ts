export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const res = await $fetch('https://api.themoviedb.org/3/genre/movie/list', {
    headers: {
      Authorization: `Bearer ${config.access_token}`,
    },
    query: {
      language: 'pt-BR',
    },
  })

  return res
})