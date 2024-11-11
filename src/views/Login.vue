<template>
  <div class="login-container">
    <div class="login-box fade-in">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" style="text-align: left;">아이디</label>
          <input 
            id="username" 
            v-model="username" 
            placeholder="아이디를 입력하세요"
            required
            class="input-field"
          />
        </div>
        <div class="form-group">
          <label for="password" style="text-align: left;">비밀번호</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            required
            class="input-field"
          />
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  // ID와 비밀번호가 'admin'일 때만 토큰 발행
  if (username.value === 'admin' && password.value === 'admin') {
    const token = 'dummy-token' // 예시용 토큰
    authStore.login(token)
    router.push('/')
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* 화면 전체를 차지하도록 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden; /* 스크롤 제거 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.fade-in {
  opacity: 0;
  animation: fadeIn 2s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.login-box {
  width: 100%;
  max-width: 380px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.login-title {
  text-align: center;
  color: #1a365d;
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.form-group {
  margin-bottom: 1.8rem;
}

label {
  display: block;
  margin-bottom: 0.7rem;
  color: #2d3748;
  font-weight: 600;
  font-size: 0.95rem;
}

.input-field {
  width: 88%;
  padding: 0.9rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.25s ease;
  background-color: #ffffff;
}

.input-field:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 4px rgba(49, 130, 206, 0.1);
}

.input-field::placeholder {
  color: #a0aec0;
}

.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(to right, #3182ce, #4299e1);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.login-button:hover {
  background: linear-gradient(to right, #2c5282, #3182ce);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
}

.login-button:active {
  transform: translateY(0);
}
</style> 