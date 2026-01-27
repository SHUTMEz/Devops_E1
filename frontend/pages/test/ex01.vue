<template>
  <div class="min-h-screen bg-kawaii-cream relative">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full" ></div>
    </div>

    <!-- Header Section -->
    <div class="relative z-10 max-w-7xl mx-auto mb-8 px-4">
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg animate-float-gentle">
              <v-icon icon="mdi-api" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">API Test Page</h1>
              <p class="text-gray-600 text-sm">Test API Endpoints</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Status</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ apiStatus }}</p>
              <p class="text-sm text-gray-500 mt-1">Count: {{ count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 animate-spin">
          <v-icon icon="mdi-loading" size="32" class="text-white mt-6"></v-icon>
        </div>
        <p class="text-kawaii-charcoal">กำลังเรียกข้อมูล API...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">API Error</h2>
        <p class="text-red-600">{{ error }}</p>
      </div>

      <!-- Test Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Test 1 -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Test API 1</h3>
              <p class="text-sm text-gray-600">Health Check Endpoint</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white shadow-lg">
              <v-icon icon="mdi-heart-pulse" size="24"></v-icon>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <p class="text-sm text-gray-600 mb-2">Endpoint:</p>
              <code class="text-sm font-mono text-kawaii-charcoal bg-white px-2 py-1 rounded">GET /api/health</code>
            </div>
            
            <div class="flex items-center space-x-4">
              <button 
                @click="listData"
                :disabled="loading"
                class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <v-icon icon="mdi-play" size="18"></v-icon>
                <span>Execute Test</span>
              </button>
              
              <div class="text-right">
                <p class="text-sm text-gray-600">Count</p>
                <p class="text-2xl font-bold text-kawaii-charcoal">{{ count }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Test 2 -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Test API 2</h3>
              <p class="text-sm text-gray-600">Users List Endpoint</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full flex items-center justify-center text-white shadow-lg">
              <v-icon icon="mdi-account-group" size="24"></v-icon>
            </div>
          </div>
          
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <p class="text-sm text-gray-600 mb-2">Endpoint:</p>
              <code class="text-sm font-mono text-kawaii-charcoal bg-white px-2 py-1 rounded">GET /api/users/list</code>
            </div>
            
            <div class="flex items-center space-x-4">
              <button 
                @click="listData2"
                :disabled="loading"
                class="bg-gradient-to-r from-kawaii-blue to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-blue hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <v-icon icon="mdi-play" size="18"></v-icon>
                <span>Execute Test</span>
              </button>
              
              <div class="text-right">
                <p class="text-sm text-gray-600">Count</p>
                <p class="text-2xl font-bold text-kawaii-charcoal">{{ count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Response Data -->
      <div v-if="responseData" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-kawaii-charcoal">Response Data</h3>
          <button 
            @click="clearResponse"
            class="bg-gray-500 text-white font-semibold px-4 py-2 rounded-kawaii-lg hover:bg-gray-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <v-icon icon="mdi-broom" size="18"></v-icon>
            <span>Clear</span>
          </button>
        </div>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
          <pre class="text-sm text-kawaii-charcoal overflow-auto max-h-64">{{ JSON.stringify(responseData, null, 2) }}</pre>
        </div>
      </div>

      <!-- Status Bar -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">API Status</h3>
            <p class="text-sm text-gray-600">Monitor API calls and responses</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div 
                class="w-3 h-3 rounded-full"
                :class="apiStatus === 'Connected' ? 'bg-kawaii-mint animate-pulse' : 'bg-red-500'"
              ></div>
              <span class="text-sm font-medium text-kawaii-charcoal">{{ apiStatus }}</span>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">Total Calls</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ count }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"

const count = ref(0)
const loading = ref(false)
const error = ref('')
const responseData = ref(null)
const apiStatus = ref('Disconnected')

const listData = async () => {
  loading.value = true
  error.value = ''
  responseData.value = null
  apiStatus.value = 'Connecting...'
  
  try {
    const data = await axios.get('http://localhost:7000/api/health?name=hello&age=20')
    console.log(data.data)
    console.log(data)
    count.value++
    responseData.value = data.data
    apiStatus.value = 'Connected'
  } catch (err) {
    console.error('API Error:', err)
    error.value = err.message || 'Failed to fetch data'
    apiStatus.value = 'Error'
  } finally {
    loading.value = false
  }
}

const listData2 = async () => {
  loading.value = true
  error.value = ''
  responseData.value = null
  apiStatus.value = 'Connecting...'
  
  try {
    const data2 = await axios.get('http://localhost:7000/api/users/list?code=CAT01')
    console.log(data2.data)
    console.log(data2)
    count.value++
    responseData.value = data2.data
    apiStatus.value = 'Connected'
  } catch (err) {
    console.error('API Error:', err)
    error.value = err.message || 'Failed to fetch data'
    apiStatus.value = 'Error'
  } finally {
    loading.value = false
  }
}

const clearResponse = () => {
  responseData.value = null
  error.value = ''
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
</style>