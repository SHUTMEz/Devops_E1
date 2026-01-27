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
              <v-icon icon="mdi-database-search" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 13</h1>
              <p class="text-gray-600 text-sm">API Data Fetching with v-for</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Data Source</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ student.length }} items</p>
              <p class="text-sm text-gray-500 mt-1">API: /api/users/list_all</p>
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
        <p class="text-kawaii-charcoal">กำลังดึงข้อมูลจาก API...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">API Error</h2>
        <p class="text-red-600">{{ error }}</p>
        <button 
          @click="fetchData"
          class="mt-4 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-2 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
        >
          Retry
        </button>
      </div>

      <!-- Main Card -->
      <div v-else class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8 mb-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 13</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">API Data</h2>
            <p class="text-sm text-gray-600 mb-4">Fetched from backend API</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Records</h4>
                <p class="text-2xl font-bold text-kawaii-charcoal">{{ student.length }}</p>
                <p class="text-sm text-gray-600">Data items</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Type</h4>
                <p class="text-2xl font-bold text-kawaii-charcoal">Array</p>
                <p class="text-sm text-gray-600">v-for iteration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Data List Section -->
      <div v-if="!loading && !error" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-format-list-bulleted" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Data List</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Iterating through API response with v-for</p>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 mb-6">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Code Example:</h4>
          <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const student = ref([])
onMounted(async() => {
    const { data } = await axios.get(
        "http://localhost:7000/api/users/list_all"
    )
    student.value = data.list
})</code></pre>
        </div>
        
        <!-- Data Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="item in student" 
            :key="item.id"
            class="bg-white rounded-kawaii-lg p-4 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <h5 class="font-semibold text-kawaii-charcoal">{{ item.name_th }}</h5>
              <span class="text-xs text-gray-500">ID: {{ item.id }}</span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">Code:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.code }}</span>
              </div>
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">Name:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.name_th }}</span>
              </div>
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">Created:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ formatDate(item.created_at) }}</span>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-xs text-kawaii-pink font-semibold">✓ API Data</span>
              <span class="text-xs text-gray-500">v-for iteration</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Current Data -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Current Data</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">API Response</h4>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div v-for="item in student" :key="item.id" class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.name_th }}</span>
                  <span class="text-xs text-gray-500">ID: {{ item.id }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>Code: {{ item.code }}</span>
                  <span>Created: {{ formatDate(item.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- API Benefits -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">API Data Fetching</h3>
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">onMounted() with API</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Perfect for initial data fetching</li>
                <li>✓ DOM is ready for API calls</li>
                <li>✓ Can use async/await syntax</li>
                <li>✓ Reactive data binding</li>
                <li>✓ Error handling support</li>
              </ul>
            </div>
            
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Binding</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ ref() for reactive data</li>
                <li>✓ Automatic template updates</li>
                <li>✓ Works with arrays and objects</li>
                <li>✓ Real-time data synchronization</li>
                <li>✓ Perfect for dynamic content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Controls</h3>
            <p class="text-sm text-gray-600">Try refreshing the data</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="fetchData"
              :disabled="loading"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <v-icon icon="mdi-refresh" size="18"></v-icon>
              <span>Refresh Data</span>
            </button>
            <button 
              @click="clearData"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-broom" size="18"></v-icon>
              <span>Clear</span>
            </button>
          </div>
        </div>
        
        <!-- Dynamic Content -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Message</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ message }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Items</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ student.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Type</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">Array</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Status</h4>
            <p class="text-sm text-kawaii-mint font-semibold">{{ loading ? 'Loading...' : 'Ready' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const message = ref("Hello Vue 3")
const student = ref([])
const loading = ref(false)
const error = ref('')

const fetchData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const { data } = await axios.get("http://localhost:7000/api/users/list_all")
    student.value = data.list
  } catch (err) {
    console.error('API Error:', err)
    error.value = err.message || 'Failed to fetch data'
  } finally {
    loading.value = false
  }
}

const clearData = () => {
  student.value = []
  error.value = ''
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchData()
})
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