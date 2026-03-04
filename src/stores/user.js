import { defineStore } from "pinia";
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref ('' || localStorage.getItem('token'))

  const setToken = (val) => {
    token.value = val
  }

  const clearToken = () => {
    token.value = ''
  }

  return {
    token,
    setToken,
    clearToken
  }
}, {
  persist: true
})
