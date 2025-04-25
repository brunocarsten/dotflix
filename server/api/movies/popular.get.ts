export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const page = getQuery(event).page || 1

  const res = await $fetch(`https://api.themoviedb.org/3/movie/popular`, {
    headers: {
      Authorization: `Bearer ${config.access_token}`,
    },
    query: {
      language: 'en-US',
      page,
    },
  })

  return res
})