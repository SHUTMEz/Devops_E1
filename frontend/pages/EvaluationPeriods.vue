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
              <v-icon icon="mdi-calendar-clock" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">จัดการช่วงเวลาการประเมิน</h1>
              <p class="text-gray-600 text-sm">Evaluation Periods Management</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้ดูแลระบบ</p>
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

      <!-- Data Table -->
      <div v-else class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden">
        <!-- Table Header -->
        <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-semibold text-kawaii-charcoal">รายการช่วงเวลาการประเมิน</h2>
              <p class="text-sm text-gray-600">Total: {{ periods.length }} periods</p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                @click="showCreateDialog = true"
                class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
              >
                <v-icon icon="mdi-plus" size="18"></v-icon>
                <span>เพิ่มช่วงเวลาใหม่</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-kawaii-pink-light">
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ชื่อช่วงเวลา</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">วันที่เริ่มต้น</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">วันที่สิ้นสุด</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">สถานะ</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="period in periods" 
                  :key="period.id"
                  class="border-b border-kawaii-pink-light hover:bg-kawaii-pink-light transition-colors duration-200"
                >
                  <td class="py-4 px-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {{ period.id }}
                      </div>
                      <div>
                        <p class="font-semibold text-kawaii-charcoal">{{ period.period_name }}</p>
                        <p class="text-sm text-gray-600">{{ period.description || 'No description' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-kawaii-charcoal">
                    {{ formatDate(period.start_date) }}
                  </td>
                  <td class="py-4 px-4 text-kawaii-charcoal">
                    {{ formatDate(period.end_date) }}
                  </td>
                  <td class="py-4 px-4">
                    <span 
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="isCurrentActivePeriod(period) ? 'bg-kawaii-mint/20 text-kawaii-mint border border-kawaii-mint/50' : getStatusClass(period.status)"
                    >
                      <v-icon :icon="isCurrentActivePeriod(period) ? 'mdi-check-circle' : getStatusIcon(period.status)" size="16" class="mr-2"></v-icon>
                      {{ isCurrentActivePeriod(period) ? 'Active (Current)' : getStatusText(period.status) }}
                    </span>
                  </td>
                  <td class="py-4 px-4">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="editPeriod(period)"
                        class="bg-kawaii-cream border border-kawaii-pink-light text-kawaii-pink font-medium px-3 py-2 rounded-kawaii hover:bg-kawaii-pink-light transition-colors duration-200 flex items-center space-x-2"
                      >
                        <v-icon icon="mdi-pencil" size="16"></v-icon>
                        <span>แก้ไข</span>
                      </button>
                      <button 
                        @click="deletePeriod(period.id)"
                        class="bg-red-50 border border-red-200 text-red-600 font-medium px-3 py-2 rounded-kawaii hover:bg-red-100 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <v-icon icon="mdi-delete" size="16"></v-icon>
                        <span>ลบ</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Dialog -->
    <div v-if="showCreateDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light w-full max-w-md">
        <!-- Dialog Header -->
        <div class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white p-6 rounded-t-kawaii-xl">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <v-icon icon="mdi-calendar-plus" size="24"></v-icon>
              <div>
                <h2 class="text-xl font-bold">{{ editingPeriod ? 'แก้ไขช่วงเวลาการประเมิน' : 'เพิ่มช่วงเวลาการประเมินใหม่' }}</h2>
                <p class="text-kawaii-pink-light text-sm mt-1">
                  {{ editingPeriod ? 'อัปเดตข้อมูลช่วงเวลา' : 'ตั้งค่าช่วงเวลาการประเมินใหม่' }}
                </p>
              </div>
            </div>
            <button @click="showCreateDialog = false" class="text-white hover:text-kawaii-cream transition-colors">
              <v-icon icon="mdi-close" size="24"></v-icon>
            </button>
          </div>
        </div>

        <!-- Dialog Content -->
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">ชื่อช่วงเวลา</label>
            <input 
              v-model="formData.period_name"
              type="text"
              placeholder="ชื่อช่วงเวลา"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">คำอธิบาย</label>
            <textarea
              v-model="formData.description"
              placeholder="คำอธิบาย"
              rows="3"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-kawaii-charcoal mb-2">วันที่เริ่มต้น</label>
              <input 
                v-model="formData.start_date"
                type="date"
                class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-kawaii-charcoal mb-2">วันที่สิ้นสุด</label>
              <input 
                v-model="formData.end_date"
                type="date"
                class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">สถานะ</label>
            <select 
              v-model="formData.status"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <!-- Dialog Actions -->
        <div class="bg-kawaii-cream border-t border-kawaii-pink-light p-6 rounded-b-kawaii-xl flex justify-end space-x-3">
          <button 
            @click="showCreateDialog = false"
            class="px-6 py-3 text-kawaii-charcoal font-semibold rounded-kawaii-lg hover:bg-white transition-colors duration-300"
          >
            ยกเลิก
          </button>
          <button 
            @click="savePeriod"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            {{ editingPeriod ? 'บันทึกการแก้ไข' : 'บันทึกช่วงเวลาใหม่' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Snackbar -->
    <div v-if="snackbar.show" class="fixed top-4 right-4 bg-white rounded-kawaii-lg shadow-kawaii-xl border border-kawaii-pink-light p-4 z-50 flex items-center space-x-3">
      <v-icon :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" size="24" :class="snackbar.color === 'success' ? 'text-kawaii-mint' : 'text-red-500'"></v-icon>
      <div>
        <p class="font-medium text-kawaii-charcoal">{{ snackbar.text }}</p>
      </div>
      <button @click="snackbar.show = false" class="text-gray-400 hover:text-gray-600 transition-colors">
        <v-icon icon="mdi-close" size="20"></v-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// State Variables
const currentUser = ref({ name_th: 'Admin', role: 'admin' })
const periods = ref([])
const loading = ref(false)
const error = ref('')
const showCreateDialog = ref(false)
const editingPeriod = ref(null)

// Form Data
const formData = ref({
  period_name: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'active'
})

// Snackbar
const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

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
      name_th: decoded.name || decoded.username || 'Admin',
      role: decoded.role || 'admin'
    }
  }

  await fetchPeriods()
}

const fetchPeriods = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get('http://localhost:7000/api/admin/periods', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    periods.value = response.data
  } catch (err) {
    console.error('Error fetching periods:', err)
    error.value = err.response?.data?.message || 'Failed to fetch periods'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  if (status === 'active') return 'bg-kawaii-mint/20 text-kawaii-mint border border-kawaii-mint/50'
  if (status === 'inactive') return 'bg-kawaii-yellow/20 text-kawaii-yellow border border-kawaii-yellow/50'
  if (status === 'completed') return 'bg-kawaii-blue/20 text-kawaii-blue border border-kawaii-blue/50'
  return 'bg-gray-100 text-gray-800 border border-gray-200'
}

const getStatusIcon = (status) => {
  if (status === 'active') return 'mdi-check-circle'
  if (status === 'inactive') return 'mdi-pause-circle'
  if (status === 'completed') return 'mdi-check-circle-outline'
  return 'mdi-circle-outline'
}

const getStatusText = (status) => {
  if (status === 'active') return 'Active'
  if (status === 'inactive') return 'Inactive'
  if (status === 'completed') return 'Completed'
  return 'Unknown'
}

// เพิ่มฟังก์ชันตรวจสอบว่าเป็นช่วงเวลาที่ Active อยู่หรือไม่
const isCurrentActivePeriod = (period) => {
  const now = new Date()
  const startDate = new Date(period.start_date)
  const endDate = new Date(period.end_date)
  return period.status === 'active' && now >= startDate && now <= endDate
}

const editPeriod = (period) => {
  editingPeriod.value = period
  formData.value = {
    period_name: period.period_name,
    description: period.description || '',
    start_date: period.start_date.split('T')[0],
    end_date: period.end_date.split('T')[0],
    status: period.status
  }
  showCreateDialog.value = true
}

const deletePeriod = async (id) => {
  if (!confirm('ต้องการลบช่วงเวลานี้ใช่ไหม?')) return

  try {
    await axios.delete(`http://localhost:7000/api/admin/periods/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    await fetchPeriods()
    showSnackbar('ลบช่วงเวลาสำเร็จ', 'success')
  } catch (err) {
    console.error('Error deleting period:', err)
    showSnackbar('ลบช่วงเวลาไม่สำเร็จ: ' + (err.response?.data?.message || err.message), 'error')
  }
}

const savePeriod = async () => {
  try {
    if (editingPeriod.value) {
      // Update existing period
      await axios.put(`http://localhost:7000/api/admin/periods/${editingPeriod.value.id}`, formData.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      showSnackbar('อัปเดตช่วงเวลาสำเร็จ', 'success')
    } else {
      // Create new period
      await axios.post('http://localhost:7000/api/admin/periods', formData.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      showSnackbar('สร้างช่วงเวลาสำเร็จ', 'success')
    }
    
    showCreateDialog.value = false
    editingPeriod.value = null
    await fetchPeriods()
    
    // Reset form
    formData.value = {
      period_name: '',
      description: '',
      start_date: '',
      end_date: '',
      status: 'active'
    }
  } catch (err) {
    console.error('Error saving period:', err)
    showSnackbar('บันทึกช่วงเวลาไม่สำเร็จ: ' + (err.response?.data?.message || err.message), 'error')
  }
}

const showSnackbar = (text, color) => {
  snackbar.value.text = text
  snackbar.value.color = color
  snackbar.value.show = true
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