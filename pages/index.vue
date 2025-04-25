<template>
  <UiContainer>
    <section class="py-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold">Filmes</h1>
      </div>
      <div
        class="grid justify-center sm:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie.title"
          :rating="movie.vote_average"
          :genre="'Filme'"
          :releaseDate="formatDate(movie.release_date)"
          :price="29.9"
          :poster="movie.poster_path"
        />
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const { data: moviesData } = await useFetch<any>(
  `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
  {
    headers: {
      Authorization: `Bearer ${config.public.access_token}`,
    },
  }
)

const movies = computed<any>(() => moviesData.value?.results || [])

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(date).toLocaleDateString("pt-BR", options)
}
</script>
