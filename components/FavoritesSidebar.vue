<template>
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-y-0 right-0 z-[9999] w-full max-w-lg p-4 flex flex-col"
    >
      <aside class="bg-gray-700 p-4 rounded-xl shadow-lg h-full flex flex-col">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-white text-lg font-bold">Meus Favoritos</h2>
          <button
            @click="favorites.clear()"
            class="text-indigo-400 text-md font-bold hover:underline"
          >
            Esvaziar
          </button>
          <button
            @click="isOpen = false"
            class="text-gray-300 hover:text-white text-xl font-bold px-2"
            aria-label="Fechar favoritos"
          >
            ×
          </button>
        </div>

        <!-- Lista -->
        <ul class="flex-1 space-y-4 overflow-y-auto">
          <li
            v-for="item in favorites.items"
            :key="item.id"
            class="flex items-center justify-between gap-2"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w92${item.poster}`"
              class="w-12 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <p class="text-white text-sm font-medium line-clamp-1">
                {{ item.title }}
              </p>
              <p class="text-xs text-gray-300">
                R$ {{ item.price.toFixed(2).replace(".", ",") }}
              </p>
            </div>
            <div class="flex flex-col gap-1">
              <button
                @click="cart.addItem(item)"
                class="text-xs text-white bg-success font-bold px-2 py-1 rounded hover:bg-green-800"
              >
                + Carrinho
              </button>
              <button
                @click="favorites.remove(item.id)"
                class="text-xs text-red-500 hover:underline px-2 py-1"
              >
                Remover
              </button>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen")
const cart = useCartStore()
const favorites = useFavoritesStore()
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
