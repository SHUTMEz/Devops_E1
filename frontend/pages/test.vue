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
              <v-icon icon="mdi-test-tube" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">หน้าทดสอบ</h1>
              <p class="text-gray-600 text-sm">Test Page</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้ใช้งาน</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ currentUser.name_th }}</p>
              <p class="text-sm text-gray-500 mt-1">Role: {{ currentUser.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Loading State -->
      <div v-if="loading" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 animate-spin">
          <v-icon icon="mdi-loading" size="32" class="text-white mt-6"></v-icon>
        </div>
        <p class="text-kawaii-charcoal">กำลังโหลดข้อมูล...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">เกิดข้อผิดพลาด</h2>
        <p class="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล: {{ error }}</p>
      </div>

      <!-- Test Data Display -->
      <div v-else class="space-y-8">
        <!-- Test Categories Section -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden">
          <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-kawaii-charcoal">ข้อมูลทดสอบ (Test Data)</h2>
                <p class="text-sm text-gray-600">Total: {{ testCategories.length }} test items</p>
              </div>
              <div class="w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white shadow-lg">
                <v-icon icon="mdi-test-tube" size="24"></v-icon>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-kawaii-pink-light">
                    <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ID</th>
                    <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">รหัส</th>
                    <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ชื่อ</th>
                    <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">วันที่สร้าง</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="item in testCategories" 
                    :key="item.id"
                    class="border-b border-kawaii-pink-light hover:bg-kawaii-pink-light transition-colors duration-200"
                  >
                    <td class="py-4 px-4 text-kawaii-charcoal font-medium">{{ item.id }}</td>
                    <td class="py-4 px-4">
                      <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                          {{ item.code }}
                        </div>
                        <span class="font-semibold text-kawaii-charcoal">{{ item.code }}</span>
                      </div>
                    </td>
                    <td class="py-4 px-4 text-kawaii-charcoal">{{ item.name_th }}</td>
                    <td class="py-4 px-4 text-kawaii-charcoal">{{ formatDate(item.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Test Actions -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">การทดสอบ</h3>
              <p class="text-sm text-gray-600">Test Actions</p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                @click="fetchTestData"
                class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
              >
                <v-icon icon="mdi-refresh" size="18"></v-icon>
                <span>รีเฟรชข้อมูล</span>
              </button>
              <button 
                @click="clearData"
                class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
              >
                <v-icon icon="mdi-broom" size="18"></v-icon>
                <span>ล้างข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// State Variables
const currentUser = ref({ name_th: 'User', role: 'user' })
const testCategories = ref([])
const loading = ref(false)
const error = ref('')

// Methods
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (e) {
    return {}
  }
}

const initPage = async () => {
  const storedToken = localStorage.getItem('token')
  if (!storedToken) {
    alert('กรุณาเข้าสู่ระบบก่อน')
    router.push('/login')
    return
  }

  // จัดการ User Info
  const userStr = localStorage.getItem('user_info')
  if (userStr) {
    try { 
      currentUser.value = JSON.parse(userStr)
    } catch (e) { }
  }
  if (!currentUser.value.id) {
    const decoded = parseJwt(storedToken)
    currentUser.value = {
      id: decoded.id || decoded.sub,
      name_th: decoded.name || decoded.username || 'User',
      role: decoded.role || 'user'
    }
  }

  await fetchTestData()
}

const fetchTestData = async () => {
  loading.value = true
  error.value = ''
  try {
    const token = localStorage.getItem('token')
    
    // ดึงข้อมูลทดสอบ
    const response = await axios.get('http://localhost:7000/api/test/list_all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    testCategories.value = response.data.list || []

  } catch (err) {
    console.error('Error fetching test data:', err)
    error.value = err.response?.data?.message || 'Failed to fetch test data'
  } finally {
    loading.value = false
  }
}

const clearData = () => {
  testCategories.value = []
  error.value = ''
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  initPage()
})

definePageMeta({
  middleware: 'auth'
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