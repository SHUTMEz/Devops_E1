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
              <v-icon icon="mdi-database" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Data Fetching</h1>
              <p class="text-gray-600 text-sm">API Data Retrieval with axios</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Status</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ status }}</p>
              <p class="text-sm text-gray-500 mt-1">Last fetch: {{ lastFetch }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Main Card -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8 mb-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Data Fetching</h1>
          <p class="text-lg text-gray-600 mb-6">Retrieve data from backend API using axios</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">API Integration</h2>
            <p class="text-sm text-gray-600 mb-4">Click the button to fetch data from the server</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Endpoint</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">http://localhost:7000</p>
                <p class="text-xs text-gray-600 mt-1">GET request</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Method</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">axios.get()</p>
                <p class="text-xs text-gray-600 mt-1">Async/await pattern</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-play-circle" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Fetch Data</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Click the button below to retrieve data from the API</p>
        
        <div class="flex justify-center">
          <button 
            @click="showData"
            :disabled="loading"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-4 rounded-kawaii-xl hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg"
          >
            <v-icon icon="mdi-database-search" size="24"></v-icon>
            <span>{{ loading ? 'Fetching...' : 'Fetch Data' }}</span>
          </button>
        </div>
      </div>

      <!-- Data Display Section -->
      <div v-if="data" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-green to-kawaii-mint rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-content-copy" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Retrieved Data</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Data successfully fetched from API</p>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 mb-6">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Preview</h4>
          <pre class="text-sm text-kawaii-charcoal overflow-auto max-h-64"><code>{{ JSON.stringify(data, null, 2) }}</code></pre>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">Data Type</h5>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ typeof data }}</p>
            <p class="text-xs text-gray-600 mt-1">JavaScript object</p>
          </div>
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">Fetch Time</h5>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ fetchTime }}</p>
            <p class="text-xs text-gray-600 mt-1">Response time</p>
          </div>
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">Status</h5>
            <p class="text-sm text-kawaii-mint font-semibold">✓ Success</p>
            <p class="text-xs text-gray-600 mt-1">Data retrieved successfully</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">Fetch Error</h2>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="showData"
          :disabled="loading"
          class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-2 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retry
        </button>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Current Status -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Current Status</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Status:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ status }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Last Fetch:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ lastFetch }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Data Type:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ data ? typeof data : 'None' }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Response Time:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ fetchTime }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Code Example</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">axios.get() Usage</h4>
            <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const showData = async () => {
  const response = await axios.get("http://localhost:7000");
  const data = response.data;
  console.log(data)
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Controls</h3>
            <p class="text-sm text-gray-600">Try fetching data from the API</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="showData"
              :disabled="loading"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <v-icon icon="mdi-database-search" size="18"></v-icon>
              <span>{{ loading ? 'Fetching...' : 'Fetch Data' }}</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Status</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ status }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Last Fetch</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ lastFetch }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Type</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ data ? typeof data : 'None' }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Response Time</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ fetchTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const data = ref(null);
const loading = ref(false);
const error = ref('');
const status = ref('Ready');
const lastFetch = ref('Never');
const fetchTime = ref('0ms');

const showData = async () => {
  loading.value = true;
  error.value = '';
  status.value = 'Fetching...';
  
  const startTime = Date.now();
  
  try {
    const response = await axios.get("http://localhost:7000");
    const endTime = Date.now();
    
    data.value = response.data;
    const duration = endTime - startTime;
    
    fetchTime.value = `${duration}ms`;
    status.value = 'Success';
    lastFetch.value = new Date().toLocaleTimeString('th-TH');
    
    console.log('Data fetched successfully:', data.value);
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err.message || 'Failed to fetch data';
    status.value = 'Error';
    fetchTime.value = 'Error';
  } finally {
    loading.value = false;
  }
};

const clearData = () => {
  data.value = null;
  error.value = '';
  status.value = 'Ready';
  fetchTime.value = '0ms';
  lastFetch.value = 'Never';
};
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