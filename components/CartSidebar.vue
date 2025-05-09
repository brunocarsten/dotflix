<template>
  <Transition name="slide">
    <div
      v-if="isOpen"
      class="fixed inset-y-0 right-0 z-[9999] w-full max-w-lg p-4 flex flex-col"
    >
      <aside
        class="rounded-xl w-full bg-gray-700 shadow-lg p-4 flex flex-col h-full"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-white">Meu Carrinho</h2>
          <div class="flex items-center gap-2">
            <button
              @click="cart.items = []"
              class="text-indigo-400 text-md font-bold hover:underline"
            >
              Esvaziar
            </button>
            <button
              @click="isOpen = false"
              class="text-gray-300 hover:text-white text-xl font-bold px-2"
              aria-label="Fechar carrinho"
            >
              ×
            </button>
          </div>
        </div>

        <ul class="flex-1 space-y-4 overflow-y-auto">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center justify-between gap-2"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w92${item.poster}`"
              :alt="item.title"
              class="w-12 h-16 object-cover rounded"
            />
            <div class="flex-1">
              <p class="text-sm font-medium line-clamp-1 text-white">
                {{ item.title }}
              </p>
              <p class="text-xs text-gray-500">
                1 x R$ {{ item.price.toFixed(2).replace(".", ",") }}
              </p>
            </div>
            <button
              @click="cart.removeItem(item.id)"
              class="text-sm text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-800"
            >
              Remover
            </button>
          </li>
        </ul>

        <div class="pt-4 border-t mt-4">
          <p class="text-sm mb-2 text-right">
            <span class="font-medium text-white">Total:</span>
            <span class="text-lg font-bold text-white">
              R$ {{ cart.total.toFixed(2).replace(".", ",") }}
            </span>
          </p>
          <div class="relative w-full flex flex-col items-center">
            <transition name="fade">
              <div
                v-if="showTooltip"
                class="absolute bottom-full mb-2 bg-red-500 text-white text-xs px-3 py-1 rounded shadow z-10 whitespace-nowrap"
              >
                Adicione um produto ao carrinho
              </div>
            </transition>

            <button
              class="w-full bg-indigo-500 text-white font-semibold py-2 rounded hover:bg-indigo-600 transition"
              @click="goToCheckout"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen")

const cart = useCartStore()
const showTooltip = ref(false)

const goToCheckout = () => {
  if (cart.items.length === 0) {
    showTooltip.value = true
    setTimeout(() => {
      showTooltip.value = false
    }, 2500)
    return
  }

  isOpen.value = false
  return navigateTo("/checkout")
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
