export const useCartStore = defineStore('cart', () => {
  const items = ref<any[]>([])

  function addItem(movie: any) {
    const exists = items.value.find(item => item.id === movie.id)
    if (!exists) items.value.push(movie)
  }

  function removeItem(id: number) {
    items.value = items.value.filter(item => item.id !== id)
  }

  const total = computed(() =>
    items.value.reduce((acc, item) => acc + 29.9, 0) // valor fixo por enquanto
  )

  return {
    items,
    addItem,
    removeItem,
    total,
  }
}, {
  persist: true
})