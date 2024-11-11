<script setup>
import { useAuthStore } from './stores/auth'
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isAuthenticated = computed(() => {
  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
  return authStore.isAuthenticated
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
