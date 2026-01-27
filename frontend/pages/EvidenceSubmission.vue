<template>
  <div class="min-h-screen bg-kawaii-cream relative">
    <!-- Animated Background -->
      <div class="fixed inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-full" ></div>
      </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 animate-spin">
          <v-icon icon="mdi-loading" size="32" class="text-white mt-6"></v-icon>
        </div>
        <p class="text-kawaii-charcoal">กำลังโหลดข้อมูล...</p>
      </div>
    </div>

    <!-- Header Section -->
    <div class="relative z-10 max-w-7xl mx-auto mb-8 px-4">
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg animate-float-gentle">
              <v-icon icon="mdi-upload" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">ส่งผลงานการประเมิน</h1>
              <p class="text-gray-600 text-sm">Evidence Submission</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้รับการประเมิน</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ currentUser.name_th }}</p>
              <p class="text-sm text-gray-500 mt-1">แผนก: {{ currentUser.dept_id || '-' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="!loading" class="relative z-10 max-w-7xl mx-auto px-4">
      
      <!-- No Data Alert -->
      <div v-if="evaluationData.length === 0" class="bg-kawaii-pink-light border border-kawaii-pink-light rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <v-icon icon="mdi-file-document-outline" size="32" class="text-kawaii-pink"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">ไม่พบรายการประเมิน</h2>
        <p class="text-gray-600">ไม่พบรายการประเมินสำหรับปีการศึกษานี้</p>
      </div>

      <!-- Evaluation Data -->
      <div v-else class="space-y-6">
        <div 
          v-for="(topic, tIndex) in evaluationData" 
          :key="topic.id"
          class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden hover:shadow-kawaii-xl transition-shadow duration-300"
        >
          <!-- Panel Header -->
          <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-kawaii-lg flex items-center justify-center text-white font-bold shadow-lg">
                  {{ tIndex + 1 }}
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-kawaii-charcoal">{{ topic.title_th }}</h3>
                  <p class="text-sm text-gray-600">{{ topic.title_en || '' }}</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <span class="text-sm text-gray-600">ความคืบหน้า:</span>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium text-kawaii-charcoal">{{ getTopicProgress(topic) }}</span>
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full transition-all duration-300"
                      :style="{ width: getProgressPercentage(topic) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel Content -->
          <div class="p-6">
            <div class="space-y-6">
              <div 
                v-for="(indicator, iIndex) in topic.indicators" 
                :key="indicator.id"
                class="border border-kawaii-pink-light rounded-kawaii-lg p-6 hover:border-kawaii-lavender transition-colors duration-200"
              >
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  <!-- Indicator Info -->
                  <div class="lg:col-span-2">
                    <div class="flex items-start space-x-3">
                      <div class="w-8 h-8 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {{ indicator.code }}
                      </div>
                      <div>
                        <h4 class="font-semibold text-kawaii-charcoal mb-2">{{ indicator.name_th }}</h4>
                        <p class="text-sm text-gray-600 mb-4">{{ indicator.description }}</p>
                        
                        <!-- Uploaded Files -->
                        <div v-if="indicator.uploaded_files && indicator.uploaded_files.length > 0" class="space-y-2">
                          <p class="text-xs text-gray-500 font-medium">ไฟล์ที่อัปโหลดแล้ว:</p>
                          <div class="flex flex-wrap gap-2">
                            <div 
                              v-for="file in indicator.uploaded_files" 
                              :key="file.id"
                              class="flex items-center space-x-2 bg-kawaii-mint/20 border border-kawaii-mint/50 rounded-kawaii px-3 py-2 hover:bg-kawaii-mint/30 transition-colors"
                            >
                              <v-icon icon="mdi-file-check" size="16" class="text-kawaii-mint"></v-icon>
                              <span class="text-sm text-kawaii-charcoal font-medium">{{ file.file_name }}</span>
                              <button 
                                @click="deleteFile(file.id, indicator)"
                                class="ml-2 text-red-500 hover:text-red-700 transition-colors"
                              >
                                <v-icon icon="mdi-close" size="16"></v-icon>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Upload Section -->
                  <div class="lg:col-span-1">
                    <div class="space-y-4">
                      <!-- Evidence Type Selection -->
                      <div v-if="indicator.allowed_evidence.length > 1" class="space-y-2">
                        <label class="block text-sm font-medium text-kawaii-charcoal">เลือกประเภทเอกสาร</label>
                        <select 
                          v-model="indicator.selectedEvidenceType"
                          class="w-full px-3 py-2 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                        >
                          <option value="" disabled selected>เลือกประเภท</option>
                          <option v-for="evidence in indicator.allowed_evidence" :key="evidence.id" :value="evidence.id">
                            {{ evidence.name_th }}
                          </option>
                        </select>
                      </div>

                      <!-- Required Evidence Info -->
                      <div v-else class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-3">
                        <p class="text-xs text-gray-600 font-medium mb-1">สิ่งที่ต้องส่ง:</p>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-kawaii-pink-light text-kawaii-pink border border-kawaii-pink-light">
                          {{ indicator.allowed_evidence[0]?.name_th || 'เอกสาร' }}
                        </span>
                      </div>

                      <!-- File Upload -->
                      <div class="space-y-2">
                        <label class="block text-sm font-medium text-kawaii-charcoal">อัปโหลดไฟล์</label>
                        <div 
                          class="border-2 border-dashed border-kawaii-pink-light rounded-kawaii-lg p-4 text-center hover:border-kawaii-lavender transition-colors duration-300"
                          :class="{
                            'border-kawaii-lavender bg-kawaii-lavender-light/20': indicator.tempFile,
                            'opacity-50 cursor-not-allowed': uploadingId === indicator.id
                          }"
                        >
                          <div v-if="!indicator.tempFile" class="text-gray-500">
                            <v-icon icon="mdi-paperclip" size="24" class="mb-2"></v-icon>
                            <p class="text-sm">ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                          </div>
                          <div v-else class="text-kawaii-mint">
                            <v-icon icon="mdi-file-check" size="24" class="mb-2"></v-icon>
                            <p class="text-sm font-medium">{{ indicator.tempFile.name }}</p>
                            <p class="text-xs text-gray-500">{{ formatFileSize(indicator.tempFile.size) }}</p>
                          </div>
                          <input 
                            type="file"
                            @change="handleFileSelect(indicator, $event)"
                            class="hidden"
                            :id="'file-input-' + indicator.id"
                          >
                          <label 
                            :for="'file-input-' + indicator.id"
                            class="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-kawaii-lg text-white bg-gradient-to-r from-kawaii-pink to-kawaii-lavender hover:from-kawaii-pink hover:to-kawaii-lavender focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kawaii-pink cursor-pointer transition-all duration-300"
                            :class="{ 'opacity-50 cursor-not-allowed': uploadingId === indicator.id }"
                            :disabled="uploadingId === indicator.id"
                          >
                            เลือกไฟล์
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// State Variables
const currentUser = ref({ name_th: 'User', role: '', dept_id: '', id: null })
const currentPeriodId = ref(null)
const currentPeriodName = ref('')
const token = ref('')
const loading = ref(true)
const uploadingId = ref(null)
const evaluationData = ref([])

// Computed Properties
const userInitials = computed(() => {
  return currentUser.value.name_th ? currentUser.value.name_th.charAt(0) : 'U'
})

const getTopicProgress = (topic) => {
  if (!topic.indicators) return '0/0'
  const completed = topic.indicators.filter(i => i.uploaded_files && i.uploaded_files.length > 0).length
  return `${completed} / ${topic.indicators.length}`
}

const getProgressPercentage = (topic) => {
  if (!topic.indicators || topic.indicators.length === 0) return 0
  const completed = topic.indicators.filter(i => i.uploaded_files && i.uploaded_files.length > 0).length
  return Math.round((completed / topic.indicators.length) * 100)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

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
  token.value = storedToken

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
      name_th: decoded.name || decoded.username || 'ผู้ใช้งาน',
      dept_id: decoded.dept_id || '-',
      role: decoded.role || 'user'
    }
  }

  // ดึงปีการศึกษา
  try {
    const periodRes = await axios.get('http://localhost:7000/api/evaluatee/current-period')
    currentPeriodId.value = periodRes.data.id
    currentPeriodName.value = periodRes.data.period_name

    console.log("Current Period:", currentPeriodName.value, "(ID:", currentPeriodId.value, ")")

    await fetchEvaluationData()
  } catch (error) {
    console.error("Failed to get period:", error)
    alert("หมดเวลาส่งผลการประเมิน หรือ เกิดปัญหาทางเทคนิค โปรดติดต่อ แอดมิน")
    loading.value = false
  }
}

const fetchEvaluationData = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/evaluatee/form-data', {
      headers: { Authorization: `Bearer ${token.value}` },
      params: { period_id: currentPeriodId.value }
    })
    evaluationData.value = response.data
    processEvaluationData()
  } catch (error) {
    console.error("Fetch Error:", error)
    if (error.response && error.response.status === 401) {
      alert('Session หมดอายุ กรุณา Login ใหม่')
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

const processEvaluationData = () => {
  evaluationData.value.forEach(topic => {
    topic.indicators.forEach(ind => {
      ind.tempFile = null
      if (ind.allowed_evidence && ind.allowed_evidence.length === 1) {
        ind.selectedEvidenceType = ind.allowed_evidence[0].id
      } else {
        ind.selectedEvidenceType = null
      }
    })
  })
}

const handleFileSelect = (indicator, event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!indicator.selectedEvidenceType) {
    alert('กรุณาเลือกประเภทเอกสารก่อน')
    return
  }

  indicator.tempFile = file
  handleFileUpload(indicator)
}

const handleFileUpload = async (indicator) => {
  const file = indicator.tempFile
  if (!file) return

  if (!indicator.selectedEvidenceType) {
    alert('กรุณาเลือกประเภทเอกสารก่อน')
    indicator.tempFile = null
    return
  }

  uploadingId.value = indicator.id

  const formData = new FormData()
  formData.append('file', file)
  formData.append('period_id', currentPeriodId.value)
  formData.append('evaluatee_id', currentUser.value.id)
  formData.append('indicator_id', indicator.id)
  formData.append('evidence_type_id', indicator.selectedEvidenceType)

  try {
    const res = await axios.post('http://localhost:7000/api/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token.value}`
      }
    })
    console.log("Response from upload:", res.data)
    if (!indicator.uploaded_files) indicator.uploaded_files = []
    indicator.uploaded_files.push({
      id: res.data.attachment_id || res.data.id || res.data.insertId,
      file_name: file.name
    })
    indicator.tempFile = null
  } catch (error) {
    alert('อัปโหลดล้มเหลว: ' + (error.response?.data?.message || error.message))
    indicator.tempFile = null
  } finally {
    uploadingId.value = null
  }
}

const deleteFile = async (fileId, indicator) => {
  if (!confirm('ต้องการลบไฟล์นี้ใช่ไหม?')) return

  try {
    await axios.delete(`http://localhost:7000/api/upload/file/${fileId}`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    indicator.uploaded_files = indicator.uploaded_files.filter(f => f.id !== fileId)
  } catch (error) {
    console.error("Delete Error:", error)
    alert('ลบไฟล์ไม่สำเร็จ: ' + (error.response?.data?.message || error.message))
  }
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
