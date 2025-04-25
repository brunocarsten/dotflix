<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-secondary/90 backdrop-blur-md text-light py-4 px-6 shadow-md border-b border-gray-800"
  >
    <div class="container mx-auto flex items-center justify-between gap-4">
      <NuxtLink to="/">
        <div class="text-2xl font-bold">
          <span class="text-success">DOT</span>Flix
        </div>
      </NuxtLink>

      <div class="relative w-full max-w-xl">
        <Icon
          icon="mdi:magnify"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
        />
        <input
          v-model="search"
          type="text"
          placeholder="Buscar filmes..."
          class="w-full rounded-lg pl-10 pr-4 py-2 bg-primary text-light placeholder-muted focus:outline-none focus:ring-2 focus:ring-success"
        />
      </div>

      <div class="flex items-center gap-4">
        <button class="relative" @click="$emit('toggle-favorites')">
          <Icon icon="mdi:heart-outline" class="w-6 h-6 text-white" />
        </button>
        <button class="relative" @click="$emit('toggle-cart')">
          <Icon icon="mdi:cart-outline" class="w-6 h-6 text-light" />
          <span
            class="absolute -top-2 -right-2 bg-danger text-xs text-white w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cart.items.length }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits(["toggle-cart", "toggle-favorites"])
const search = defineModel<string>("search", {
  default: "",
})

const cart = useCartStore()
</script>
