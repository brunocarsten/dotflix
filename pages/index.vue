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
const page = ref(1)
const pending = ref(false)
const loading = ref(false)
const allLoaded = ref(false)
const loadTrigger = ref<HTMLElement | null>(null)
const movies = ref<any>([])

async function fetchMovies(reset = false) {
  pending.value = true

  const query = search.value?.trim()

  const url = query
    ? `/api/movies/search?query=${encodeURIComponent(query)}&page=${page.value}`
    : `/api/movies/popular?page=${page.value}`

  const { data } = await useFetch<any>(url)

  if (reset) {
    movies.value = data.value?.results || []
  } else {
    movies.value = [...movies.value, ...(data.value?.results || [])]
  }

  pending.value = false
}

const { data: genresData } = await useFetch<any>("/api/movies/genres")

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
        loadMore()
      }
    },
    { threshold: 1.0 }
  )

  if (loadTrigger.value) observer.observe(loadTrigger.value)

  onBeforeUnmount(() => {
    if (loadTrigger.value) observer.unobserve(loadTrigger.value)
  })
})

async function loadMore() {
  if (pending.value) return

  page.value++
  await fetchMovies(false)
}

watch(search, async () => {
  page.value = 1
  await fetchMovies(true)
})

useSeoMeta({
  title: "DOTFlix - Sua loja de filmes",
  description:
    "Compre filmes incríveis na DOTFlix. A melhor seleção de filmes online.",
  ogTitle: "DOTFlix - Sua loja de filmes",
  ogDescription:
    "Compre filmes incríveis na DOTFlix. A melhor seleção de filmes online.",
  ogImage: "/og-image.png",
  ogUrl: "https://dotflix.vercel.app",
  twitterTitle: "DOTFlix - Sua loja de filmes",
  twitterDescription: "Compre filmes incríveis na DOTFlix.",
  twitterImage: "/og-image-home.png",
  twitterCard: "summary_large_image",
})
</script>
