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
              <v-icon icon="mdi-account-group" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">User Data Management</h1>
              <p class="text-gray-600 text-sm">API Data Retrieval and Table Display</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Filter</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">CAT08</p>
              <p class="text-sm text-gray-500 mt-1">User category filter</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">User Data Management</h1>
          <p class="text-lg text-gray-600 mb-6">Load and display user data from backend API</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">User Data Display</h2>
            <p class="text-sm text-gray-600 mb-4">Click the button to load user data from the server</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Endpoint</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">http://localhost:7000/api/users/list</p>
                <p class="text-xs text-gray-600 mt-1">GET request with query parameter</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Filter Parameter</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">code=CAT08</p>
                <p class="text-xs text-gray-600 mt-1">User category filtering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-database-search" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Load User Data</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Click the button below to retrieve user data from the API</p>
        
        <div class="flex justify-center">
          <button 
            @click="showData"
            :disabled="loading"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-4 rounded-kawaii-xl hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg"
          >
            <v-icon icon="mdi-account-search" size="24"></v-icon>
            <span>{{ loading ? 'Loading...' : 'Load Users' }}</span>
          </button>
        </div>
      </div>

      <!-- Data Table Section -->
      <div v-if="users.length" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-green to-kawaii-mint rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-table" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">User Data Table</h3>
        <p class="text-sm text-gray-600 text-center mb-6">User information retrieved from API</p>
        
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-kawaii-lg border border-gray-200">
            <thead class="bg-kawaii-cream">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Code</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Name (TH)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.code" class="hover:bg-kawaii-cream/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal font-semibold">{{ user.code }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal">{{ user.name_th }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Showing {{ users.length }} user(s)
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-kawaii-mint font-semibold">✓ Data loaded successfully</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && users.length === 0" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center mb-8">
        <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-account-off" size="48" class="text-gray-400"></v-icon>
        </div>
        <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Users Found</h3>
        <p class="text-gray-600 mb-6">No user data available for the selected filter.</p>
        <button 
          @click="showData"
          :disabled="loading"
          class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Try Again
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">Load Error</h2>
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
                <span class="text-sm text-gray-600">Last Load:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ lastLoad }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Filter:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">CAT08</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Users Loaded:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ users.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Code Example</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">API Data Loading</h4>
            <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const showData = async () => {
  const response = await axios.get(
    "http://localhost:7000/api/users/list?code=CAT08"
  );
  users.value = [response.data.list];
};</code></pre>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Controls</h3>
            <p class="text-sm text-gray-600">Try loading user data from the API</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="showData"
              :disabled="loading"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <v-icon icon="mdi-account-search" size="18"></v-icon>
              <span>{{ loading ? 'Loading...' : 'Load Users' }}</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Last Load</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ lastLoad }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Filter</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">CAT08</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Users Loaded</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ users.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const users = ref([]);
const loading = ref(false);
const error = ref('');
const status = ref('Ready');
const lastLoad = ref('Never');

const showData = async () => {
  loading.value = true;
  error.value = '';
  status.value = 'Loading...';
  
  try {
    console.log("Button clicked");
    const response = await axios.get(
      "http://localhost:7000/api/users/list?code=CAT08"
    );
    console.log("RAW DATA:", response.data.list);
    
    // แปลงข้อมูลให้อยู่ในรูปแบบ array
    users.value = [response.data.list];
    status.value = 'Loaded';
    lastLoad.value = new Date().toLocaleTimeString('th-TH');
    
    console.log("DATA LIST:", response.data.list);
  } catch (err) {
    console.error('Error loading user data:', err);
    error.value = err.message || 'Failed to load data';
    status.value = 'Error';
  } finally {
    loading.value = false;
  }
};

const clearData = () => {
  users.value = [];
  error.value = '';
  status.value = 'Ready';
  lastLoad.value = 'Never';
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

table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  border-bottom: 1px solid #e5e7eb;
}

th:first-child, td:first-child {
  border-left: 1px solid #e5e7eb;
  border-top-left-radius: 8px;
}

th:last-child, td:last-child {
  border-right: 1px solid #e5e7eb;
  border-top-right-radius: 8px;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}
</style>