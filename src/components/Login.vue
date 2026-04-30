<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <div class="logo-icon">🗓️</div>
        <h1>活动日历</h1>
        <p class="subtitle">活动管理系统</p>
      </div>
      
      <div class="login-form">
        <input 
          v-model="inputUsername"
          type="text" 
          class="mi-input"
          placeholder="请输入用户名"
          @keyup.enter="handleLogin"
        />
        <button class="mi-btn mi-btn-primary login-btn" @click="handleLogin">
          进入系统
        </button>
      </div>
      
      <div class="features">
        <div class="feature-item">
          <span class="feature-icon">📅</span>
          <span>月/年双视图</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">✏️</span>
          <span>活动管理</span>
        </div>
        <div class="feature-item">
          <span class="feature-icon">💾</span>
          <span>本地存储</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])
const inputUsername = ref('')

const handleLogin = () => {
  if (inputUsername.value.trim()) {
    emit('login', inputUsername.value.trim())
  } else {
    alert('请输入用户名')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF6900 0%, #FF8C42 100%);
  padding: 20px;
}

.login-container {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.logo {
  margin-bottom: 32px;
}

.logo-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--mi-black);
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 16px;
  color: var(--mi-gray-600);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.login-btn {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--mi-gray-200);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--mi-gray-600);
}

.feature-icon {
  font-size: 24px;
}

@media (max-width: 480px) {
  .login-container {
    padding: 32px 24px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .features {
    gap: 16px;
  }
  
  .feature-item {
    font-size: 12px;
  }
}
</style>
