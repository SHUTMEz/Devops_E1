<template>
  <div class="min-h-screen bg-kawaii-cream relative overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full" ></div>
    </div>

    <!-- Floating Elements -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-10 left-10 w-20 h-20 bg-kawaii-pink-light rounded-full opacity-20 animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-20 right-10 w-16 h-16 bg-kawaii-lavender-light rounded-full opacity-20 animate-bounce" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-10 left-1/4 w-24 h-24 bg-kawaii-blue-light rounded-full opacity-20 animate-bounce" style="animation-delay: 2s;"></div>
      <div class="absolute bottom-20 right-1/3 w-12 h-12 bg-kawaii-mint-light rounded-full opacity-20 animate-bounce" style="animation-delay: 3s;"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="w-full max-w-md">
        <!-- Welcome Card -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8 mb-6 text-center">
          <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 shadow-lg animate-float-gentle">
            <v-icon icon="mdi-account-circle" size="48" class="text-white"></v-icon>
          </div>
          <h1 class="text-3xl font-bold text-kawaii-charcoal mb-2">Welcome</h1>
          <p class="text-gray-600 text-sm">{{ isLogin ? 'Login to system' : 'Register new user' }}</p>
        </div>

        <!-- Login/Register Card -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8">
          <!-- Tabs -->
          <div class="flex bg-kawaii-cream rounded-kawaii-lg p-1 mb-6">
            <button 
              @click="step = 1"
              :class="['flex-1 py-2 px-4 rounded-kawaii-lg font-semibold text-sm transition-all duration-300', step === 1 ? 'bg-white text-kawaii-pink shadow-kawaii-sm' : 'text-gray-600 hover:text-kawaii-charcoal']"
            >
              Login
            </button>
            <button 
              @click="step = 2"
              :class="['flex-1 py-2 px-4 rounded-kawaii-lg font-semibold text-sm transition-all duration-300', step === 2 ? 'bg-white text-kawaii-lavender shadow-kawaii-sm' : 'text-gray-600 hover:text-kawaii-charcoal']"
            >
              Register
            </button>
          </div>

          <!-- Login Form -->
          <div v-if="step === 1" class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Email</label>
              <div class="relative">
                <v-icon icon="mdi-email" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="loginData.email"
                  type="email"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Password</label>
              <div class="relative">
                <v-icon icon="mdi-lock" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="loginData.password"
                  :type="showPass ? 'text' : 'password'"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-10 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                >
                <button 
                  @click="showPass = !showPass"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-kawaii-charcoal"
                >
                  <v-icon :icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" size="20"></v-icon>
                </button>
              </div>
            </div>

            <button 
              @click="handleLogin"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <v-icon icon="mdi-login" size="20"></v-icon>
              <span>{{ loading ? 'Logging in...' : 'Login' }}</span>
            </button>

            <div class="text-center text-sm text-gray-600 mt-4">
              Don't have an account? 
              <button @click="step = 2" class="text-kawaii-pink font-semibold hover:text-kawaii-lavender transition-colors">Register</button>
            </div>
          </div>

          <!-- Register Form -->
          <div v-if="step === 2" class="space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Email</label>
              <div class="relative">
                <v-icon icon="mdi-email" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="regData.email"
                  type="email"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Password</label>
              <div class="relative">
                <v-icon icon="mdi-lock" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="regData.password"
                  type="password"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  placeholder="Create a password"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Name (TH)</label>
              <div class="relative">
                <v-icon icon="mdi-account" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="regData.name_th"
                  type="text"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  placeholder="Enter your name"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Department ID</label>
              <div class="relative">
                <v-icon icon="mdi-domain" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="regData.department_id"
                  type="text"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  placeholder="Enter department ID"
                >
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-kawaii-charcoal">Org Group ID</label>
              <div class="relative">
                <v-icon icon="mdi-office-building" size="20" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></v-icon>
                <input 
                  v-model="regData.org_group_id"
                  type="text"
                  class="w-full bg-gray-50 border border-gray-300 rounded-kawaii-lg pl-10 pr-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  placeholder="Enter org group ID"
                >
              </div>
            </div>

            <button 
              @click="handleRegister"
              :disabled="loading"
              class="w-full bg-gradient-to-r from-kawaii-lavender to-kawaii-blue text-white font-semibold py-3 rounded-kawaii-lg hover:from-kawaii-lavender hover:to-kawaii-blue transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <v-icon icon="mdi-account-plus" size="20"></v-icon>
              <span>{{ loading ? 'Creating...' : 'Create User' }}</span>
            </button>

            <div class="text-center text-sm text-gray-600 mt-4">
              Back to login? 
              <button @click="step = 1" class="text-kawaii-lavender font-semibold hover:text-kawaii-blue transition-colors">Login</button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-xs text-gray-500">
          <p>System Management Interface</p>
          <p class="mt-1">Built with Vue.js & Tailwind CSS</p>
        </div>
      </div>
    </div>

    <!-- Snackbar -->
    <div v-if="snackbar.show" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div :class="['bg-white rounded-kawaii-lg shadow-kawaii-xl border border-gray-200 p-4 flex items-center space-x-3', snackbar.color === 'success' ? 'border-kawaii-pink-light' : 'border-red-200']">
        <v-icon :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" :color="snackbar.color === 'success' ? 'kawaii-pink' : 'red'" size="24"></v-icon>
        <span class="text-kawaii-charcoal font-medium">{{ snackbar.text }}</span>
        <button @click="snackbar.show = false" class="ml-2 text-gray-400 hover:text-gray-600">
          <v-icon icon="mdi-close" size="20"></v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import axios from 'axios'

// State Variables
const step = ref(1)
const showPass = ref(false)
const loading = ref(false)
const isLogin = computed(() => step.value === 1)

// Login Data
const loginData = reactive({
  email: '',
  password: ''
})

// Register Data
const regData = reactive({
  email: '',
  password: '',
  name_th: '',
  department_id: '',
  org_group_id: ''
})

// Snackbar
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
})

// Login Function
const handleLogin = async () => {
  loading.value = true
  try {
    const response = await axios.post('http://localhost:7000/api/auth/login', {
      email: loginData.email,
      password: loginData.password
    })

    console.log('Login Success:', response.data)
    showSnackbar('Login Successful!', 'success')
    
  } catch (error) {
    console.error('Login Error:', error)
    showSnackbar('Login Failed: ' + (error.response?.data?.message || error.message), 'error')
  } finally {
    loading.value = false
  }
}

// Register Function
const handleRegister = async () => {
  loading.value = true
  try {
    const payload = {
      email: regData.email,
      password: regData.password,
      name_th: regData.name_th,
      department_id: regData.department_id,
      org_group_id: regData.org_group_id
    }

    const response = await axios.post('http://localhost:7000/api/users/create', payload)

    console.log('Register Success:', response.data)
    showSnackbar('User Created Successfully!', 'success')
    
    setTimeout(() => {
      step.value = 1
    }, 1500)

  } catch (error) {
    console.error('Register Error:', error)
    showSnackbar('Registration Failed: ' + (error.response?.data?.message || error.message), 'error')
  } finally {
    loading.value = false
  }
}

// Helper Function
const showSnackbar = (text, color) => {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}
</script>

<style scoped>
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>