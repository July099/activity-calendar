<template>
  <div class="app">
    <Login v-if="!isLoggedIn" @login="handleLogin" />
    <Calendar v-else :username="username" @logout="handleLogout" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Calendar from './components/Calendar.vue'

const isLoggedIn = ref(false)
const username = ref('')

const handleLogin = (name) => {
  username.value = name
  isLoggedIn.value = true
}

const handleLogout = () => {
  isLoggedIn.value = false
  username.value = ''
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
}
</style>
