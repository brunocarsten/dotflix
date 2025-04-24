<template>
  <div
    class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full sm:w-[18rem]"
  >
    <!-- Parte superior (imagem + ícone de favorito) -->
    <div class="relative bg-gray-100 h-40 flex items-center justify-center">
      <Icon
        icon="mdi:heart"
        class="absolute top-2 right-2 w-5 h-5 text-muted cursor-pointer"
      />
      <Icon icon="mdi:image-outline" class="w-12 h-12 text-gray-400" />
    </div>

    <!-- Data -->
    <div class="text-center text-muted text-sm py-2 border-b border-gray-200">
      7 de Janeiro, 2019
    </div>

    <!-- Info do filme -->
    <div class="p-4 text-center space-y-1">
      <p class="font-bold text-gray-800">Nome do Filme</p>
      <div class="flex items-center justify-center gap-1 text-sm text-gray-600">
        <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
        <span class="font-medium">7</span>
        <span class="mx-1">·</span>
        <span>Gênero</span>
      </div>
      <p class="text-gray-700 text-sm">R$ 79,99</p>
    </div>

    <!-- Botão -->
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
}>()
</script>
