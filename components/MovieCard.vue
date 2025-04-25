<template>
  <div
    class="relative bg-secondary rounded-xl shadow-md border border-gray-700 overflow-hidden w-full sm:w-[18rem] flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
  >
    <button
      @click.stop="toggleFavorite"
      class="absolute top-2 right-2 p-1 bg-black/50 rounded-full"
    >
      <Icon
        :icon="favorites.isFavorited(id) ? 'mdi:heart' : 'mdi:heart-outline'"
        class="w-5 h-5 text-red-500"
      />
    </button>
    <div class="overflow-hidden group">
      <img
        :src="`https://image.tmdb.org/t/p/w500${poster}`"
        :alt="title"
        loading="lazy"
        class="h-60 w-full object-cover rounded-t-xl"
      />
    </div>

    <div class="text-center text-muted text-sm py-2 border-b border-gray-700">
      {{ releaseDate }}
    </div>

    <div class="p-4 text-center space-y-1 flex-1">
      <p class="text-lg font-semibold text-light tracking-tight line-clamp-2">
        {{ title }}
      </p>
      <div class="flex items-center justify-center gap-1 text-sm text-muted">
        <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
        <span class="font-medium">{{ rating?.toFixed(1) }}</span>
        <span class="mx-1">·</span>
        <span class="truncate">{{ genre }}</span>
      </div>
      <p class="text-green-400 text-sm">
        R$ {{ price.toFixed(2).replace(".", ",") }}
      </p>
    </div>

    <button
      @click.stop="cart.addItem({ id, title, poster, price })"
      :disabled="isInCart(id)"
      class="w-full mt-2 py-2 rounded-lg font-semibold transition bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
    >
      {{ isInCart(id) ? "No carrinho" : "Adicionar" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "@/types"
const { id, title, poster, price } = defineProps<Movie>()

const cart = useCartStore()
const favorites = useFavoritesStore()

function isInCart(id: number) {
  return cart.items.some((item) => item.id === id)
}

const toggleFavorite = () => {
  if (favorites.isFavorited(id)) {
    favorites.remove(id)
  } else {
    favorites.add({ id, title, poster, price })
  }
}
</script>
