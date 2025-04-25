<template>
  <div
    class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full sm:w-[18rem] flex flex-col"
  >
    <img
      :src="poster ? `https://image.tmdb.org/t/p/w500${poster}` : placeholder"
      :alt="title"
      loading="lazy"
      class="h-60 w-full object-cover bg-gray-100"
    />

    <div class="text-center text-muted text-sm py-2 border-b border-gray-200">
      {{ releaseDate }}
    </div>

    <div class="p-4 text-center space-y-1 flex-1">
      <p class="font-bold text-gray-800 line-clamp-2">{{ title }}</p>
      <div class="flex items-center justify-center gap-1 text-sm text-gray-600">
        <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
        <span class="font-medium">{{ rating.toFixed(1) }}</span>
        <span class="mx-1">·</span>
        <span class="truncate">{{ genre }}</span>
      </div>
      <p class="text-gray-700 text-sm">
        R$ {{ price.toFixed(2).replace(".", ",") }}
      </p>
    </div>

    <button
      class="w-full py-2 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition rounded-b-lg"
    >
      Adicionar
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  rating: number
  genre: string
  releaseDate: string
  price: number
  poster: string
}>()

const placeholder = "https://via.placeholder.com/300x450?text=Sem+Imagem"
</script>
