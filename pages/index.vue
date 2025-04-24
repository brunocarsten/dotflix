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
          title="Nome do Filme"
          :rating="7"
          genre="Ação"
          releaseDate="7 de Janeiro, 2019"
          :price="79.99"
        />
        <MovieCard
          title="Nome do Filme"
          :rating="7"
          genre="Ação"
          releaseDate="7 de Janeiro, 2019"
          :price="79.99"
        />
      </div>
    </section>
  </UiContainer>
</template>

<script setup lang="ts"></script>
