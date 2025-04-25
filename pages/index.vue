<template>
  <UiContainer class="pt-24">
    <section class="py-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Filmes</h1>
        {{ search }}
      </div>
      <div
        class="grid justify-center sm:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <MovieCard
          v-for="movie in movies"
          :id="movie.id"
          :key="movie.id"
          :title="movie.title"
          :rating="movie.vote_average"
          :genre="genreMap.get(movie.genre_ids[0]) ?? 'Gênero'"
          :releaseDate="formatDate(movie.release_date)"
          :price="29.9"
          :poster="movie.poster_path"
        />
        <UiMovieCardSkeleton
          v-if="loading"
          v-for="i in 4"
          :key="'skeleton-' + i"
        />
        <div ref="loadTrigger" class="h-1" />
        <div class="text-center text-muted text-sm py-4" v-if="allLoaded">
          Todos os filmes foram carregados.
        </div>
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts">
const search = inject("searchTerm") as Ref<string>
const config = useRuntimeConfig()
// const movies = ref<any[]>([])
const page = ref(1)
const loading = ref(false)
const allLoaded = ref(false)
const loadTrigger = ref<HTMLElement | null>(null)

const {
  data: moviesData,
  refresh,
  status,
} = await useFetch<any>(
  () => {
    const query = search?.value?.trim()

    return query
      ? `https://api.themoviedb.org/3/search/movie?query=${query}&language=pt-BR`
      : `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`
  },
  {
    headers: {
      Authorization: `Bearer ${config.public.access_token}`,
    },
    watch: [search],
  }
)
const movies = computed(() => moviesData.value?.results || [])

// const { data: initialData } = await useAsyncData<any>("movies", () =>
//   $fetch(`https://api.themoviedb.org/3/movie/popular`, {
//     headers: {
//       Authorization: `Bearer ${config.public.access_token}`,
//     },
//     query: {
//       language: "pt-BR",
//       page: page.value,
//     },
//   })
// )
// movies.value = initialData.value?.results ?? []
// page.value++

const fetchMovies = async () => {
  if (loading.value || allLoaded.value) return
  loading.value = true

  const { data } = await useFetch<any>(
    `https://api.themoviedb.org/3/movie/popular`,
    {
      query: {
        language: "en",
        page: page.value,
      },
      headers: {
        Authorization: `Bearer ${config.public.access_token}`,
      },
    }
  )

  const results = data.value?.results ?? []
  if (results.length === 0) {
    allLoaded.value = true
  } else {
    movies.value.push(...results)
    page.value++
  }

  loading.value = false
}

const { data: genresData } = await useFetch<any>(
  "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR",
  {
    headers: {
      Authorization: `Bearer ${config.public.access_token}`,
    },
  }
)

const genreMap = computed(() => {
  const map = new Map<number, string>()
  genresData.value?.genres?.forEach((genre: { id: number; name: string }) => {
    map.set(genre.id, genre.name)
  })
  return map
})

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(date).toLocaleDateString("pt-BR", options)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchMovies()
      }
    },
    { threshold: 1.0 }
  )

  if (loadTrigger.value) observer.observe(loadTrigger.value)

  onBeforeUnmount(() => {
    if (loadTrigger.value) observer.unobserve(loadTrigger.value)
  })
})
</script>
