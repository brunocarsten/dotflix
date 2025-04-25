<template>
  <header class="bg-secondary text-light py-4 px-6 shadow-md">
    <div class="container mx-auto flex items-center justify-between gap-4">
      <!-- Logo -->
      <NuxtLink to="/">
        <div class="text-2xl font-bold">
          <span class="text-success">DOT</span>Flix
        </div>
      </NuxtLink>

      <!-- Campo de busca -->
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

      <!-- Ações -->
      <div class="flex items-center gap-4">
        <button class="relative">
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

<script setup>
const search = ref("")
const cart = useCartStore()
defineEmits(["toggle-cart"])
</script>
