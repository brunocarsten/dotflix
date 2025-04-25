export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { query, page = 1 } = getQuery(event)

  const res = await $fetch(`https://api.themoviedb.org/3/search/movie`, {
    headers: {
      Authorization: `Bearer ${config.access_token}`,
    },
    query: {
      query,
      language: 'en-US',
      page,
    },
  })

  return res
})