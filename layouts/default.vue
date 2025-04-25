<template>
  <div class="relative bg-gray-900 text-light min-h-screen">
    <LayoutHeader
      @toggle-cart="isCartOpen = !isCartOpen"
      @toggle-favorites="isFavoritesOpen = !isFavoritesOpen"
      v-model:search="searchTerm"
    />
    <main>
      <NuxtPage />
    </main>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isCartOpen">
          <div
            class="fixed inset-0 bg-black/50 z-[999]"
            @click="isCartOpen = false"
          />
          <CartSidebar v-model:isOpen="isCartOpen" />
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="isFavoritesOpen">
          <div
            class="fixed inset-0 bg-black/50 z-[999]"
            @click="isFavoritesOpen = false"
          />
          <FavoritesSidebar v-model:isOpen="isFavoritesOpen" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const isCartOpen = ref(false)
const isFavoritesOpen = ref(false)

const searchTerm = ref("")
provide("searchTerm", searchTerm)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
