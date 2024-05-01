import { defineStore } from 'pinia'

export const useStore = defineStore('open', {
  state: () => {
    return {
      // Modal
      open: false,
    }
  }
})