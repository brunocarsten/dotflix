<template>
  <div class="relative bg-primary text-light min-h-screen">
    <LayoutHeader @toggle-cart="isCartOpen = !isCartOpen" />
    <main>
      <NuxtPage />
    </main>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isCartOpen">
          <div
            class="fixed inset-0 bg-black/50 z-40"
            @click="isCartOpen = false"
          />
          <CartSidebar v-model:isOpen="isCartOpen" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const isCartOpen = ref(false)
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
