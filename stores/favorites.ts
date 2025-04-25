import type { Movie } from '@/types'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as Movie[],
  }),
  actions: {
    add(item: Movie) {
      if (!this.items.find(i => i.id === item.id)) {
        this.items.push(item)
      }
    },
    remove(id: number) {
      this.items = this.items.filter(i => i.id !== id)
    },
    clear() {
      this.items = []
    },
    isFavorited(id: number) {
      return this.items.some(i => i.id === id)
    }
  },
  persist: true
})
