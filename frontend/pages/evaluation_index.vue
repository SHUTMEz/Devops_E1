<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const config = useRuntimeConfig()
const authStore = useAuthStore()

// ดึงข้อมูล
const { data: assignments, pending, error } = await useFetch(`${config.public.apiBase}/api/evaluator/assignments`, {
    headers: { Authorization: `Bearer ${authStore.token}` }
})

// แปลงเป็น Array กัน error
const items = computed(() => assignments.value || [])

// ไปหน้าประเมิน
const selectEvaluatee = (id) => {
    router.push(`/assess-hybrid?id=${id}`)
}

// Helper: สีสถานะ
const getStatusColor = (status) => {
    if(status === 'completed') return 'kawaii-mint'
    if(status === 'in_progress') return 'kawaii-yellow'
    return 'kawaii-sky'
}

const getStatusText = (status) => {
    if(status === 'completed') return 'ประเมินเสร็จสิ้น'
    if(status === 'in_progress') return 'กำลังประเมิน'
    return 'ยังไม่เริ่ม'
}

const getStatusIcon = (status) => {
    if(status === 'completed') return 'mdi-check-circle'
    if(status === 'in_progress') return 'mdi-progress-clock'
    return 'mdi-circle-outline'
}
</script>

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
              <v-icon icon="mdi-account-group-outline" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">รายการประเมินบุคลากร</h1>
              <p class="text-gray-600 text-sm">Evaluation Assignments</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้ประเมิน</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ authStore.user?.name_th || 'Evaluator' }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ authStore.user?.role || 'evaluator' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      
      <!-- Loading State -->
      <div v-if="pending" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center">
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
        <p class="text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล: {{ error.message }}</p>
      </div>

      <!-- No Data State -->
      <div v-else-if="items.length === 0" class="bg-kawaii-pink-light border border-kawaii-pink-light rounded-kawaii-xl p-8 text-center">
        <div class="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <v-icon icon="mdi-account-group-off" size="32" class="text-kawaii-pink"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">ไม่มีรายการประเมิน</h2>
        <p class="text-gray-600">ไม่มีรายการที่ต้องประเมินในขณะนี้</p>
      </div>

      <!-- Data Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="item in items" 
          :key="item.id"
          @click="selectEvaluatee(item.id)"
          class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden hover:shadow-kawaii-xl hover:border-kawaii-lavender transition-all duration-300 cursor-pointer transform hover:scale-105 animate-float-gentle"
        >
          <!-- Status Badge -->
          <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <v-icon :icon="getStatusIcon(item.status)" size="20" :class="getStatusColor(item.status)"></v-icon>
                <span class="text-sm font-medium text-kawaii-charcoal">{{ getStatusText(item.status) }}</span>
              </div>
              <div class="text-right">
                <span class="text-xs text-gray-500">รอบ</span>
                <p class="text-sm font-semibold text-kawaii-charcoal">{{ item.period_name }}</p>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Avatar -->
            <div class="flex justify-center mb-4">
              <div class="w-20 h-20 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {{ item.evaluatee_name?.charAt(0) }}
              </div>
            </div>

            <!-- Name -->
            <h3 class="text-lg font-bold text-kawaii-charcoal text-center mb-2">{{ item.evaluatee_name }}</h3>

            <!-- Details -->
            <div class="space-y-3 text-center">
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div class="flex items-center space-x-2">
                  <v-icon icon="mdi-briefcase" size="16" class="text-kawaii-pink"></v-icon>
                  <span>{{ item.position }}</span>
                </div>
                <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div class="flex items-center space-x-2">
                  <v-icon icon="mdi-domain" size="16" class="text-kawaii-lavender"></v-icon>
                  <span>{{ item.department }}</span>
                </div>
              </div>
            </div>

            <!-- Action Button -->
            <div class="mt-6 flex justify-center">
              <button class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2">
                <v-icon icon="mdi-clipboard-text" size="18"></v-icon>
                <span>เริ่มการประเมิน</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}
</style>
