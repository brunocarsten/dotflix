<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
    >
      <div
        class="bg-white dark:bg-secondary rounded-xl p-6 w-full max-w-md text-center shadow-xl"
      >
        <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          Compra realizada!
        </h2>
        <p class="text-gray-600 dark:text-muted mb-6">
          Obrigado por sua compra. Seus ingressos serão enviados por e-mail.
        </p>
        <button
          class="bg-indigo-500 text-white font-semibold py-2 px-6 rounded hover:bg-indigo-600 transition"
          @click="close"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()
const emit = defineEmits(["close"])

function close() {
  emit("close")
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
