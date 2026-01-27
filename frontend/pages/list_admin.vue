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
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">จัดการบัญชีผู้ใช้งาน</h1>
              <p class="text-gray-600 text-sm">User Management</p>
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
              <h2 class="text-xl font-semibold text-kawaii-charcoal">รายการบัญชีผู้ใช้งาน</h2>
              <p class="text-sm text-gray-600">Total: {{ users.length }} users</p>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                @click="showCreateDialog = true"
                class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
              >
                <v-icon icon="mdi-plus" size="18"></v-icon>
                <span>เพิ่มผู้ใช้งานใหม่</span>
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
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ชื่อ-สกุล</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">อีเมล</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">แผนก</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ตำแหน่ง</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">บทบาท</th>
                  <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="user in users" 
                  :key="user.id"
                  class="border-b border-kawaii-pink-light hover:bg-kawaii-pink-light transition-colors duration-200"
                >
                  <td class="py-4 px-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {{ user.name_th?.charAt(0) }}
                      </div>
                      <div>
                        <p class="font-semibold text-kawaii-charcoal">{{ user.name_th }}</p>
                        <p class="text-sm text-gray-600">{{ user.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-kawaii-charcoal">
                    {{ user.email }}
                  </td>
                  <td class="py-4 px-4 text-kawaii-charcoal">
                    {{ user.department_name || 'N/A' }}
                  </td>
                  <td class="py-4 px-4 text-kawaii-charcoal">
                    {{ user.position || 'N/A' }}
                  </td>
                  <td class="py-4 px-4">
                    <span 
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="getRoleClass(user.role)"
                    >
                      {{ getRoleText(user.role) }}
                    </span>
                  </td>
                  <td class="py-4 px-4">
                    <div class="flex items-center space-x-2">
                      <button 
                        @click="editUser(user)"
                        class="bg-kawaii-cream border border-kawaii-pink-light text-kawaii-pink font-medium px-3 py-2 rounded-kawaii hover:bg-kawaii-pink-light transition-colors duration-200 flex items-center space-x-2"
                      >
                        <v-icon icon="mdi-pencil" size="16"></v-icon>
                        <span>แก้ไข</span>
                      </button>
                      <button 
                        @click="deleteUser(user.id)"
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
              <v-icon icon="mdi-account-plus" size="24"></v-icon>
              <div>
                <h2 class="text-xl font-bold">{{ editingUser ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มผู้ใช้งานใหม่' }}</h2>
                <p class="text-kawaii-pink-light text-sm mt-1">
                  {{ editingUser ? 'อัปเดตข้อมูลผู้ใช้งาน' : 'สร้างบัญชีผู้ใช้งานใหม่' }}
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
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">ชื่อ-สกุล</label>
            <input 
              v-model="formData.name_th"
              type="text"
              placeholder="ชื่อ-สกุล"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">อีเมล</label>
            <input 
              v-model="formData.email"
              type="email"
              placeholder="อีเมล"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">รหัสผ่าน</label>
            <input 
              v-model="formData.password"
              type="password"
              placeholder="รหัสผ่าน"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-kawaii-charcoal mb-2">แผนก</label>
              <select 
                v-model="formData.department_id"
                class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
              >
                <option value="" disabled selected>เลือกแผนก</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name_th }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-kawaii-charcoal mb-2">ตำแหน่ง</label>
              <input 
                v-model="formData.position"
                type="text"
                placeholder="ตำแหน่ง"
                class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-kawaii-charcoal mb-2">บทบาท</label>
            <select 
              v-model="formData.role"
              class="w-full px-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
            >
              <option value="admin">Admin</option>
              <option value="evaluator">Evaluator</option>
              <option value="evaluatee">Evaluatee</option>
              <option value="user">User</option>
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
            @click="saveUser"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            {{ editingUser ? 'บันทึกการแก้ไข' : 'บันทึกผู้ใช้งานใหม่' }}
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
const users = ref([])
const departments = ref([])
const loading = ref(false)
const error = ref('')
const showCreateDialog = ref(false)
const editingUser = ref(null)

// Form Data
const formData = ref({
  name_th: '',
  email: '',
  password: '',
  department_id: null,
  position: '',
  role: 'user'
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

  await Promise.all([fetchUsers(), fetchDepartments()])
}

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get('http://localhost:7000/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    users.value = response.data
  } catch (err) {
    console.error('Error fetching users:', err)
    error.value = err.response?.data?.message || 'Failed to fetch users'
  } finally {
    loading.value = false
  }
}

const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/users/departments_show_all', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    departments.value = response.data.data_departments || []
  } catch (err) {
    console.error('Error fetching departments:', err)
  }
}

const getRoleClass = (role) => {
  if (role === 'admin') return 'bg-red-100 text-red-800 border border-red-200'
  if (role === 'evaluator') return 'bg-blue-100 text-blue-800 border border-blue-200'
  if (role === 'evaluatee') return 'bg-green-100 text-green-800 border border-green-200'
  return 'bg-gray-100 text-gray-800 border border-gray-200'
}

const getRoleText = (role) => {
  if (role === 'admin') return 'Admin'
  if (role === 'evaluator') return 'Evaluator'
  if (role === 'evaluatee') return 'Evaluatee'
  return 'User'
}

const editUser = (user) => {
  editingUser.value = user
  formData.value = {
    name_th: user.name_th,
    email: user.email,
    password: '', // ไม่แสดงรหัสผ่านเดิม
    department_id: user.department_id,
    position: user.position,
    role: user.role
  }
  showCreateDialog.value = true
}

const deleteUser = async (id) => {
  if (!confirm('ต้องการลบผู้ใช้งานนี้ใช่ไหม?')) return

  try {
    await axios.delete(`http://localhost:7000/api/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    await fetchUsers()
    showSnackbar('ลบผู้ใช้งานสำเร็จ', 'success')
  } catch (err) {
    console.error('Error deleting user:', err)
    showSnackbar('ลบผู้ใช้งานไม่สำเร็จ: ' + (err.response?.data?.message || err.message), 'error')
  }
}

const saveUser = async () => {
  try {
    if (editingUser.value) {
      // Update existing user
      await axios.put(`http://localhost:7000/api/admin/users/${editingUser.value.id}`, formData.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      showSnackbar('อัปเดตข้อมูลผู้ใช้งานสำเร็จ', 'success')
    } else {
      // Create new user
      await axios.post('http://localhost:7000/api/admin/users', formData.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      showSnackbar('สร้างผู้ใช้งานสำเร็จ', 'success')
    }
    
    showCreateDialog.value = false
    editingUser.value = null
    await fetchUsers()
    
    // Reset form
    formData.value = {
      name_th: '',
      email: '',
      password: '',
      department_id: null,
      position: '',
      role: 'user'
    }
  } catch (err) {
    console.error('Error saving user:', err)
    showSnackbar('บันทึกข้อมูลไม่สำเร็จ: ' + (err.response?.data?.message || err.message), 'error')
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