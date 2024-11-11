<template>
  <div class="login-container">
    <div :class="['login-box', { 'fade-in': !loginFailed, 'shake': shakeEffect }]">
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
        <div class="form-group" style="height: 2px;">
          <p v-if="loginFailed" class="error-message">로그인 실패</p>
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loginFailed = ref(false) // loginFailed 변수를 정의합니다.
const shakeEffect = ref(false) // 흔들림 효과를 위한 변수
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  // ID와 비밀번호가 'admin'일 때만 토큰 발행
  if (username.value === 'admin' && password.value === 'admin') {
    const token = 'dummy-token' // 예시용 토큰
    authStore.login(token)
    router.push('/')
    loginFailed.value = false // 로그인 성공 시 loginFailed를 false로 설정합니다.
  } else {
    loginFailed.value = true
    triggerShakeEffect() // 로그인 실패 시 흔들림 효과를 트리거합니다.
  }
}

// 흔들림 효과를 트리거하는 함수
const triggerShakeEffect = () => {
  shakeEffect.value = false // 기존의 흔들림 효과를 초기화
  setTimeout(() => {
    shakeEffect.value = true
    setTimeout(() => {
      shakeEffect.value = false
    }, 300) // 0.3초 후에 shakeEffect를 false로 설정
  }, 0) // 즉시 흔들림 효과를 다시 시작
}

// loginFailed가 true로 변경될 때마다 shakeEffect를 true로 설정
watch(loginFailed, (newVal) => {
  if (newVal) {
    triggerShakeEffect()
  }
})
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
  animation: fadeIn 3s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.login-box {
  width: 100%;
  max-width: 280px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.shake {
  animation: shake 0.3s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-10px); }
  40%, 80% { transform: translateX(10px); }
}

.login-title {
  text-align: center;
  color: #1a365d;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.form-group {
  margin-bottom: 1.3rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
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
  color: #1a365d;
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
  margin-top: 0.3rem;
}

.login-button:hover {
  background: linear-gradient(to right, #2c5282, #3182ce);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 153, 225, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.error-message{
    color: red;
    font-size: 0.8rem;
    
}
</style> 