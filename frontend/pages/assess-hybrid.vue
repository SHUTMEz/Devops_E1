<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const authStore = useAuthStore()

const assignmentId = route.query.id 
const evidenceDialog = ref(false)
const currentIndicator = ref(null)
const currentFile = ref(null)
const openPanels = ref([]) 

// Fetch Data
const { data: apiResponse, pending, refresh } = await useFetch(
    `${config.public.apiBase}/api/evaluator/assessments/${assignmentId}`, 
    { headers: { Authorization: `Bearer ${authStore.token}` } }
)

const assignmentInfo = computed(() => apiResponse.value?.assignment_info || {})
const evaluationForm = computed(() => apiResponse.value?.form_data || [])

const progress = computed(() => {
    if (!evaluationForm.value.length) return 0
    let total = 0, filled = 0
    evaluationForm.value.forEach(t => t.indicators.forEach(i => {
        total++
        if ((i.type === 'score_1_4' && i.score) || (i.type === 'yes_no'&& i.yes_no_val !== null)) filled++
    }))
    return total === 0 ? 0 : Math.round((filled / total) * 100)
})

const getTopicProgress = (topic) => {
    if (!topic.indicators.length) return '0%'
    let total = 0, filled = 0
    topic.indicators.forEach(i => {
        total++
        if ((i.type === 'score_1_4' && i.score) || (i.type === 'yes_no'&& i.yes_no_val !== null)) filled++
    })
    return total === 0 ? '0%' : Math.round((filled / total) * 100) + '%'
}

const getProgressPercentage = (topic) => {
    if (!topic.indicators.length) return 0
    let total = 0, filled = 0
    topic.indicators.forEach(i => {
        total++
        if ((i.type === 'score_1_4' && i.score) || (i.type === 'yes_no'&& i.yes_no_val !== null)) filled++
    })
    return total === 0 ? 0 : Math.round((filled / total) * 100)
}

const openEvidence = (indicator) => {
  currentIndicator.value = indicator
  currentFile.value = null
  evidenceDialog.value = true
}

const submitEvaluation = async () => {
    try {
        const results = []
        evaluationForm.value.forEach(topic => {
            topic.indicators.forEach(item => {
                if (item.score || item.yes_no_val !== null || item.note) {
                    results.push({
                        indicator_id: item.id,
                        score: item.score,
                        value_yes_no: item.yes_no_val,
                        notes: item.note
                    })
                }
            })
        })

        const payload = {
            assignment_id: assignmentId,
            results: results,
            status: progress.value === 100 ? 'completed' : 'in_progress'
        }

        await $fetch(`${config.public.apiBase}/api/evaluator/submit`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${authStore.token}` },
            body: payload
        })

        alert('บันทึกข้อมูลเรียบร้อย!')
        router.push('/evaluation_index') 
    } catch (err) {
        console.error(err)
        alert('เกิดข้อผิดพลาด: ' + (err.data?.message || err.message))
    }
}
</script>

<template>
  <div class="min-h-screen bg-kawaii-cream relative">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full" ></div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div class="text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 animate-spin">
          <v-icon icon="mdi-loading" size="32" class="text-white mt-6"></v-icon>
        </div>
        <p class="text-kawaii-charcoal">กำลังโหลดข้อมูล...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="relative z-10 max-w-7xl mx-auto px-4">
      
      <!-- Header Card -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg animate-float-gentle">
              <v-icon icon="mdi-clipboard-text" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">การประเมินบุคลากร</h1>
              <p class="text-gray-600 text-sm">Evaluation Assessment</p>
            </div>
          </div>
          
          <div class="text-right">
            <div class="text-sm text-gray-600 mb-2">ความคืบหน้า</div>
            <div class="text-3xl font-bold text-kawaii-pink">{{ progress }}%</div>
            <div class="w-32 bg-kawaii-cream rounded-full h-2 mt-2">
              <div 
                class="h-2 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full transition-all duration-500"
                :style="{ width: progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assignment Info -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {{ assignmentInfo.evaluatee?.charAt(0) }}
            </div>
            <div>
              <h2 class="text-xl font-bold text-kawaii-charcoal">{{ assignmentInfo.evaluatee }}</h2>
              <p class="text-gray-600">{{ assignmentInfo.position }} | {{ assignmentInfo.department }}</p>
              <p class="text-sm text-gray-500 mt-1">รอบ: {{ assignmentInfo.period_name }}</p>
            </div>
          </div>
          
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้ประเมิน</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ authStore.user?.name_th || 'Evaluator' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Evaluation Form -->
      <div class="space-y-6">
        <div 
          v-for="(topic, tIndex) in evaluationForm" 
          :key="topic.id"
          class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden"
        >
          <!-- Panel Header -->
          <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-kawaii-lg flex items-center justify-center text-white font-bold shadow-lg">
                  {{ tIndex + 1 }}
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-kawaii-charcoal">{{ topic.code }}: {{ topic.title }}</h3>
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
                v-for="(item, idx) in topic.indicators" 
                :key="item.id"
                class="border border-kawaii-pink-light rounded-kawaii-lg p-6 hover:border-kawaii-lavender transition-colors duration-200"
              >
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  <!-- Indicator Info -->
                  <div class="lg:col-span-2">
                    <div class="flex items-start space-x-3">
                      <div class="w-8 h-8 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {{ item.code }}
                      </div>
                      <div>
                        <h4 class="font-semibold text-kawaii-charcoal mb-2">{{ item.name }}</h4>
                        <p class="text-sm text-gray-600 mb-4">{{ item.desc }}</p>
                        
                        <!-- Evidence Files -->
                        <div v-if="item.files && item.files.length > 0" class="space-y-2">
                          <p class="text-xs text-gray-500 font-medium">หลักฐานประกอบ:</p>
                          <div class="flex flex-wrap gap-2">
                            <div 
                              v-for="file in item.files" 
                              :key="file.id"
                              class="flex items-center space-x-2 bg-kawaii-blue/20 border border-kawaii-blue/50 rounded-kawaii px-3 py-2 hover:bg-kawaii-blue/30 transition-colors cursor-pointer"
                              @click="openEvidence(item)"
                            >
                              <v-icon icon="mdi-paperclip" size="16" class="text-kawaii-blue"></v-icon>
                              <span class="text-sm text-kawaii-charcoal font-medium">{{ file.name }}</span>
                              <v-icon icon="mdi-eye" size="16" class="text-kawaii-blue ml-2"></v-icon>
                            </div>
                          </div>
                        </div>
                        <div v-else class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-3">
                          <p class="text-xs text-gray-500">ไม่มีหลักฐานประกอบ</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Evaluation Form -->
                  <div class="lg:col-span-1">
                    <div class="space-y-4">
                      
                      <!-- Score Input -->
                      <div v-if="item.type === 'score_1_4'" class="space-y-3">
                        <div class="flex items-center justify-between">
                          <label class="text-sm font-medium text-kawaii-charcoal">ระดับคุณภาพ</label>
                          <span v-if="item.score" class="text-sm font-bold text-kawaii-pink">{{ item.score }}/4 คะแนน</span>
                        </div>
                        <div class="relative">
                          <input 
                            type="range" 
                            min="1" 
                            max="4" 
                            step="1"
                            v-model="item.score"
                            class="w-full h-2 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-kawaii appearance-none cursor-pointer slider"
                          >
                          <div class="flex justify-between text-xs text-gray-500 mt-2">
                            <span>1 (ต่ำ)</span>
                            <span>2 (ปานกลาง)</span>
                            <span>3 (ดี)</span>
                            <span>4 (ดีมาก)</span>
                          </div>
                        </div>
                      </div>

                      <!-- Yes/No Input -->
                      <div v-else-if="item.type === 'yes_no'" class="space-y-3">
                        <label class="text-sm font-medium text-kawaii-charcoal">ผลการประเมิน</label>
                        <div class="grid grid-cols-2 gap-2">
                          <button 
                            @click="item.yes_no_val = 1"
                            :class="[
                              'p-3 rounded-kawaii border-2 font-semibold transition-all duration-300',
                              item.yes_no_val === 1 
                                ? 'border-kawaii-mint bg-kawaii-mint/20 text-kawaii-mint shadow-kawaii' 
                                : 'border-gray-200 bg-white text-gray-600 hover:border-kawaii-mint'
                            ]"
                          >
                            <v-icon icon="mdi-check" size="16" class="mr-2"></v-icon>
                            ผ่าน
                          </button>
                          <button 
                            @click="item.yes_no_val = 0"
                            :class="[
                              'p-3 rounded-kawaii border-2 font-semibold transition-all duration-300',
                              item.yes_no_val === 0 
                                ? 'border-red-500 bg-red-50 text-red-700 shadow-kawaii' 
                                : 'border-gray-200 bg-white text-gray-600 hover:border-red-300'
                            ]"
                          >
                            <v-icon icon="mdi-close" size="16" class="mr-2"></v-icon>
                            ไม่ผ่าน
                          </button>
                        </div>
                      </div>

                      <!-- Notes Input -->
                      <div class="space-y-2">
                        <label class="text-sm font-medium text-kawaii-charcoal">ความคิดเห็นเพิ่มเติม</label>
                        <textarea 
                          v-model="item.note"
                          rows="3"
                          placeholder="กรอกความคิดเห็นเพิ่มเติม..."
                          class="w-full px-3 py-2 bg-kawaii-cream border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300 resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="fixed bottom-6 right-6 z-50">
        <button 
          @click="submitEvaluation"
          class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-4 rounded-kawaii-xl hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
        >
          <v-icon icon="mdi-content-save-check" size="20"></v-icon>
          <span>บันทึกข้อมูล ({{ progress }}%)</span>
        </button>
      </div>

      <!-- Evidence Dialog -->
      <div v-if="evidenceDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <!-- Dialog Header -->
          <div class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white p-6 rounded-t-kawaii-xl">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <v-icon icon="mdi-paperclip" size="24"></v-icon>
                </div>
                <div>
                  <h2 class="text-xl font-bold">{{ currentIndicator?.code }}: หลักฐานประกอบ</h2>
                  <p class="text-kawaii-pink-light text-sm mt-1">Evidence Files</p>
                </div>
              </div>
              <button @click="evidenceDialog = false" class="text-white hover:text-kawaii-cream transition-colors">
                <v-icon icon="mdi-close" size="24"></v-icon>
              </button>
            </div>
          </div>

          <!-- Dialog Content -->
          <div class="p-6 max-h-[60vh] overflow-y-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- File List -->
              <div class="lg:col-span-1">
                <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
                  <h3 class="text-sm font-semibold text-kawaii-charcoal mb-3">รายการไฟล์ ({{ currentIndicator?.files?.length || 0 }})</h3>
                  <div class="space-y-2">
                    <div 
                      v-for="(file, i) in currentIndicator?.files || []" 
                      :key="i"
                      @click="currentFile = file"
                      class="flex items-center space-x-3 p-3 rounded-kawaii hover:bg-white cursor-pointer transition-colors"
                      :class="{ 'bg-white shadow-kawaii-xl': currentFile === file }"
                    >
                      <v-icon 
                        :icon="file.type === 'pdf' ? 'mdi-file-pdf-box' : 'mdi-image'" 
                        size="24" 
                        class="text-kawaii-pink"
                      ></v-icon>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-kawaii-charcoal">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">{{ file.type }}</p>
                      </div>
                      <button 
                        v-if="currentFile === file"
                        class="p-2 rounded-kawaii hover:bg-kawaii-pink-light transition-colors"
                      >
                        <v-icon icon="mdi-download" size="16" class="text-kawaii-pink"></v-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- File Preview -->
              <div class="lg:col-span-2">
                <div class="bg-white border border-gray-200 rounded-kawaii-lg p-4 min-h-[300px]">
                  <div v-if="!currentFile" class="text-center text-gray-500 py-12">
                    <v-icon icon="mdi-eye-off-outline" size="64" class="mb-4"></v-icon>
                    <p>เลือกไฟล์เพื่อดูตัวอย่าง</p>
                  </div>
                  
                  <div v-else-if="currentFile.type === 'image'" class="flex justify-center">
                    <img :src="currentFile.url" alt="Evidence" class="max-w-full h-auto rounded-kawaii-lg shadow-kawaii-xl">
                  </div>
                  
                  <div v-else-if="currentFile.type === 'pdf'" class="w-full h-[500px]">
                    <iframe :src="currentFile.url" width="100%" height="100%" style="border: none;"></iframe>
                  </div>
                  
                  <div v-else class="text-center text-gray-500 py-12">
                    <v-icon icon="mdi-file-question" size="64" class="mb-4"></v-icon>
                    <p>ไม่รองรับการแสดงผล</p>
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

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9EB5, #A78BFA);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF9EB5, #A78BFA);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}
</style>