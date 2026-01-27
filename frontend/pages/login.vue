<template>
  <div class="min-h-screen bg-kawaii-cream relative overflow-hidden">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none">
      <!-- Clouds Animation -->
      <div class="absolute top-0 left-0 w-full h-full" ></div>
      
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-32 h-32 bg-kawaii-pink-light rounded-full opacity-50 animate-bounce-slow"></div>
      <div class="absolute top-40 right-10 w-24 h-24 bg-kawaii-lavender-light rounded-full opacity-50 animate-float-gentle" style="animation-delay: 1s"></div>
      <div class="absolute bottom-20 left-20 w-28 h-28 bg-kawaii-sky rounded-full opacity-50 animate-bounce-slow" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 right-20 w-20 h-20 bg-kawaii-mint rounded-full opacity-50 animate-float-gentle" style="animation-delay: 3s"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
      <div class="w-full max-w-lg">
        
        <!-- Welcome Card -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8 text-center">
          
          <!-- Header -->
          <div class="mb-6">
            <div class="w-20 h-20 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg animate-float-gentle">
              <v-icon icon="mdi-shield-account" size="32" class="text-white"></v-icon>
            </div>
            <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">ยินดีต้อนรับ</h1>
            <p class="text-gray-600 text-sm">
              {{ isLogin ? 'เข้าสู่ระบบเพื่อเริ่มการประเมิน' : 'สร้างบัญชีใหม่' }}
            </p>
          </div>

          <!-- Form Content -->
          <div class="space-y-4">
            <!-- Login Form -->
            <div v-if="step === 1" class="space-y-4">
              <div class="space-y-2">
                <label class="block text-left text-sm font-medium text-kawaii-charcoal">อีเมล</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <v-icon icon="mdi-email" size="18" class="text-gray-400"></v-icon>
                  </div>
                  <input 
                    v-model="loginData.email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    class="w-full pl-10 pr-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-left text-sm font-medium text-kawaii-charcoal">รหัสผ่าน</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <v-icon icon="mdi-lock" size="18" class="text-gray-400"></v-icon>
                  </div>
                  <input 
                    v-model="loginData.password" 
                    :type="showPass ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-12 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  >
                  <button 
                    @click="showPass = !showPass"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <v-icon :icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" size="18"></v-icon>
                  </button>
                </div>
              </div>

              <button 
                @click="handleLogin"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold py-3 rounded-kawaii hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">เข้าสู่ระบบ</span>
                <span v-else>กำลังเข้าสู่ระบบ...</span>
              </button>

              <div class="text-center pt-2">
                <span class="text-sm text-gray-600">ยังไม่มีบัญชี? </span>
                <button 
                  @click="step = 2"
                  class="text-sm font-semibold text-kawaii-pink hover:text-kawaii-lavender transition-colors"
                >
                  สมัครสมาชิก
                </button>
              </div>
            </div>

            <!-- Register Form -->
            <div v-else class="space-y-4">
              <div class="space-y-2">
                <label class="block text-left text-sm font-medium text-kawaii-charcoal">อีเมล</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <v-icon icon="mdi-email" size="18" class="text-gray-400"></v-icon>
                  </div>
                  <input 
                    v-model="regData.email" 
                    type="email" 
                    placeholder="your.email@example.com"
                    class="w-full pl-10 pr-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-left text-sm font-medium text-kawaii-charcoal">รหัสผ่าน</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <v-icon icon="mdi-lock" size="18" class="text-gray-400"></v-icon>
                  </div>
                  <input 
                    v-model="regData.password" 
                    type="password"
                    placeholder="••••••••"
                    class="w-full pl-10 pr-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <label class="block text-left text-sm font-medium text-kawaii-charcoal">ชื่อ-สกุล (ภาษาไทย)</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <v-icon icon="mdi-account" size="18" class="text-gray-400"></v-icon>
                  </div>
                  <input 
                    v-model="regData.name_th" 
                    type="text"
                    placeholder="ชื่อ-สกุล"
                    class="w-full pl-10 pr-4 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  >
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-left text-sm font-medium text-kawaii-charcoal">แผนก</label>
                  <select 
                    v-model="regData.department_id"
                    :disabled="loadingData"
                    class="w-full px-3 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled selected>เลือกแผนก</option>
                    <option v-for="dept in data_departments" :key="dept.id" :value="dept.id">
                      {{ dept.name_th }}
                    </option>
                  </select>
                </div>
                
                <div class="space-y-2">
                  <label class="block text-left text-sm font-medium text-kawaii-charcoal">กลุ่มงาน</label>
                  <select 
                    v-model="regData.org_group_id"
                    :disabled="loadingData"
                    class="w-full px-3 py-3 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-lavender focus:border-transparent transition-all duration-300"
                  >
                    <option value="" disabled selected>เลือกกลุ่มงาน</option>
                    <option v-for="org in org_groups" :key="org.id" :value="org.id">
                      {{ org.name_th }}
                    </option>
                  </select>
                </div>
              </div>

              <button 
                @click="handleRegister"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-kawaii-lavender to-kawaii-blue text-white font-semibold py-3 rounded-kawaii hover:from-kawaii-lavender hover:to-kawaii-blue transform hover:scale-105 transition-all duration-300 shadow-kawaii disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!loading">สร้างบัญชี</span>
                <span v-else>กำลังสร้างบัญชี...</span>
              </button>

              <div class="text-center pt-2">
                <span class="text-sm text-gray-600">มีบัญชีอยู่แล้ว? </span>
                <button 
                  @click="step = 1"
                  class="text-sm font-semibold text-kawaii-lavender hover:text-kawaii-blue transition-colors"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-6 text-kawaii-charcoal/60 text-sm">
          ระบบประเมินบุคลากร VEC Skills
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 animate-spin">
          <v-icon icon="mdi-loading" size="32" class="text-white mt-6"></v-icon>
        </div>
        <p class="text-kawaii-charcoal">กำลังดำเนินการ...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateX(0px); }
  100% { transform: translateX(-60px); }
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false
})

// State Variables
const step = ref(1)
const showPass = ref(false)
const loading = ref(false)
const loadingData = ref(false)
const isLogin = computed(() => step.value === 1)
const authStore = useAuthStore()
const router = useRouter()

// Dropdown Data
const data_departments = ref([])
const org_groups = ref([])

// Form Data
const loginData = reactive({
  email: '',
  password: ''
})

const regData = reactive({
  email: '',
  password: '',
  name_th: '',
  department_id: null,
  org_group_id: null
})

// Snackbar
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success'
})

// Functions
const fetchDropdownData = async () => {
  loadingData.value = true
  try {
    const [deptRes, orgRes] = await Promise.all([
      axios.get('http://localhost:7000/api/users/departments_show_all'),
      axios.get('http://localhost:7000/api/users/org_groups_show_all')
    ])
    data_departments.value = deptRes.data.data_departments
    org_groups.value = orgRes.data.data_org_groups
  } catch (error) {
    console.error('Error fetching dropdown data:', error)
    showSnackbar('ไม่สามารถดึงข้อมูลแผนกหรือกลุ่มงานได้', 'error')
  } finally {
    loadingData.value = false
  }
}

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await axios.post('http://localhost:7000/api/auth/login', {
      email: loginData.email,
      password: loginData.password
    })

    authStore.setAuth(response.data.token, response.data.user)
    showSnackbar('Login Successful!', 'success')

    const role = authStore.user?.role
    if (role === 'admin') {
      await router.push('/EvaluationPeriods')
    } else if (role === 'evaluatee') {
      await router.push('/EvidenceSubmission')
    } else if (role === 'evaluator') {
      await router.push('/evaluation_index')
    } else {
      await router.push('/')
    }
  } catch (error) {
    console.error('Login Error:', error)
    showSnackbar('Login Failed: ' + (error.response?.data?.message || error.message), 'error')
  } finally {
    loading.value = false
  }
}

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

const showSnackbar = (text, color) => {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

onMounted(() => {
  fetchDropdownData()
})
</script>
