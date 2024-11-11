import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    login(token) {
      this.token = token
    },
    logout() {
      this.token = null
    }
  }
}) 