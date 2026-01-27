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
              <v-icon icon="mdi-file-check" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">ตรวจหลักฐานการปฏิบัติงาน</h1>
              <p class="text-gray-600 text-sm">Evidence Assessment by File</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">ผู้รับการประเมิน</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ evaluateeInfo.name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ evaluateeInfo.position }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Submission Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="file in submittedFiles" 
          :key="file.id"
          class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden hover:shadow-kawaii-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          :class="{ 'border-kawaii-mint border-2': file.status === 'graded' }"
          @click="openReview(file)"
        >
          <!-- File Preview -->
          <div class="bg-kawaii-cream border-b border-kawaii-pink-light p-6">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 shadow-lg">
              <v-icon 
                :icon="file.type === 'pdf' ? 'mdi-file-pdf-box' : 'mdi-image'" 
                size="40" 
                class="text-white"
              ></v-icon>
            </div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal text-center mb-2">{{ file.name }}</h3>
            <p class="text-sm text-gray-600 text-center mb-4">เกี่ยวข้องกับ {{ file.related_indicators.length }} ตัวชี้วัด</p>
          </div>

          <!-- File Status -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <v-chip 
                :color="file.status === 'graded' ? 'kawaii-mint' : 'kawaii-pink'" 
                variant="tonal"
                class="font-semibold"
              >
                <v-icon :icon="file.status === 'graded' ? 'mdi-check-circle' : 'mdi-clock-outline'" size="16" class="mr-2"></v-icon>
                {{ file.status === 'graded' ? 'ตรวจแล้ว' : 'รอตรวจ' }}
              </v-chip>
              <v-btn 
                color="kawaii-pink" 
                variant="tonal" 
                size="small"
                class="rounded-kawaii-lg font-semibold"
              >
                ตรวจงาน
              </v-btn>
            </div>

            <!-- Related Indicators -->
            <div class="space-y-2">
              <p class="text-xs text-gray-600 font-medium mb-2">ตัวชี้วัดที่เกี่ยวข้อง:</p>
              <div 
                v-for="indicator in file.related_indicators" 
                :key="indicator.id"
                class="flex items-center justify-between bg-kawaii-cream rounded-kawaii px-3 py-2"
              >
                <span class="text-sm text-kawaii-charcoal font-medium">{{ indicator.code }}</span>
                <span class="text-xs text-gray-600">{{ indicator.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="submittedFiles.length === 0" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center">
        <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-file-document-outline" size="48" class="text-gray-400"></v-icon>
        </div>
        <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">ไม่มีไฟล์ส่งมา</h3>
        <p class="text-gray-600 mb-6">ยังไม่มีผู้รับการประเมินส่งไฟล์มา</p>
      </div>
    </div>

    <!-- Review Dialog -->
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card class="bg-kawaii-cream">
        <!-- Toolbar -->
        <v-toolbar color="kawaii-lavender" density="compact" class="rounded-b-kawaii-lg">
          <v-btn icon="mdi-close" @click="dialog = false" class="text-white"></v-btn>
          <v-toolbar-title class="text-subtitle-1 text-white font-semibold">
            กำลังตรวจ: {{ currentFile?.name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
            variant="tonal" 
            color="white" 
            prepend-icon="mdi-content-save"
            @click="saveScoreForFile"
            :disabled="!isFileComplete(currentFile)"
            class="rounded-kawaii-lg font-semibold"
          >
            บันทึกผลตรวจ
          </v-btn>
        </v-toolbar>

        <!-- Content -->
        <v-row no-gutters class="h-100" style="height: calc(100vh - 48px) !important;">
          <!-- File Preview Section -->
          <v-col cols="12" md="7" class="h-100 bg-white rounded-r-kawaii-xl">
            <div class="h-full flex items-center justify-center p-8">
              <div v-if="currentFile?.type === 'image'" class="w-full h-full flex items-center justify-center">
                <v-img 
                  :src="currentFile.url"
                  max-height="80%"
                  contain
                  class="rounded-kawaii-xl shadow-kawaii-xl"
                ></v-img>
              </div>
              <div v-else class="text-center">
                <v-icon size="120" color="kawaii-pink" class="mb-6">mdi-file-document-outline</v-icon>
                <h3 class="text-2xl font-bold text-kawaii-charcoal mb-4">ตัวอย่างไฟล์ PDF</h3>
                <p class="text-gray-600 mb-6">นี่คือตัวอย่างการดูตัวอย่างไฟล์ PDF</p>
                <v-btn 
                  variant="tonal" 
                  color="kawaii-pink"
                  :href="currentFile?.url" 
                  target="_blank"
                  class="rounded-kawaii-lg font-semibold"
                >
                  เปิดไฟล์ในแท็บใหม่
                </v-btn>
              </div>
            </div>
          </v-col>

          <!-- Assessment Section -->
          <v-col cols="12" md="5" class="h-100 bg-white overflow-y-auto rounded-l-kawaii-xl">
            <div class="p-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  ✓
                </div>
                <div>
                  <h3 class="text-xl font-bold text-kawaii-charcoal">ตัวชี้วัดที่เกี่ยวข้อง</h3>
                  <p class="text-sm text-gray-600">ประเมินและให้คะแนนตามหลักฐาน</p>
                </div>
              </div>

              <!-- Indicators List -->
              <div 
                v-for="(indicator, i) in currentFile?.related_indicators"
                :key="i"
                class="bg-white border border-kawaii-pink-light rounded-kawaii-xl p-6 mb-4 shadow-kawaii-xl hover:shadow-kawaii-xl transition-shadow"
              >
                <div class="bg-kawaii-cream border border-kawaii-pink-light rounded-kawaii-lg p-4 mb-4">
                  <h4 class="font-bold text-kawaii-charcoal">{{ indicator.code }}: {{ indicator.name }}</h4>
                </div>

                <!-- Score Type -->
                <div v-if="indicator.type === 'score_1_4'" class="space-y-4">
                  <div class="text-sm font-semibold text-kawaii-charcoal mb-3">คะแนนคุณภาพ</div>
                  <v-slider
                    v-model="indicator.score"
                    :min="1"
                    :max="4"
                    :step="1"
                    thumb-label="always"
                    color="kawaii-pink"
                    track-color="gray-200"
                    show-ticks="always"
                    tick-size="4"
                    class="mt-2"
                  ></v-slider>
                  <div class="flex justify-between text-xs text-gray-600">
                    <span>ปรับปรุง (1)</span>
                    <span>ดีเยี่ยม (4)</span>
                  </div>
                </div>

                <!-- Yes/No Type -->
                <div v-else-if="indicator.type === 'yes_no'" class="space-y-4">
                  <div class="text-sm font-semibold text-kawaii-charcoal mb-3">ผลการประเมิน</div>
                  <v-btn-toggle 
                    v-model="indicator.yes_no_val" 
                    density="compact" 
                    color="kawaii-pink" 
                    mandatory 
                    class="w-full"
                  >
                    <v-btn 
                      value="yes" 
                      class="flex-grow-1 rounded-kawaii-lg font-semibold"
                      variant="tonal"
                    >
                      <v-icon icon="mdi-check" size="16" class="mr-2"></v-icon>
                      ผ่าน
                    </v-btn>
                    <v-btn 
                      value="no" 
                      class="flex-grow-1 rounded-kawaii-lg font-semibold"
                      variant="tonal"
                    >
                      <v-icon icon="mdi-close" size="16" class="mr-2"></v-icon>
                      ไม่ผ่าน
                    </v-btn>
                  </v-btn-toggle>
                </div>

                <!-- Notes -->
                <v-textarea
                  v-model="indicator.note"
                  label="ความคิดเห็น / ข้อเสนอแนะ"
                  rows="3"
                  variant="outlined"
                  class="mt-4 rounded-kawaii-lg"
                  color="kawaii-pink"
                ></v-textarea>
              </div>

              <!-- Save Button -->
              <v-divider class="my-6"></v-divider>
              <v-btn 
                block 
                size="large" 
                color="kawaii-mint"
                @click="saveScoreForFile"
                :disabled="!isFileComplete(currentFile)"
                class="rounded-kawaii-xl font-semibold text-white text-lg py-4 transform hover:scale-105 transition-transform"
              >
                <v-icon icon="mdi-check-circle" size="20" class="mr-2"></v-icon>
                ยืนยันผลการตรวจไฟล์นี้
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock Data
const evaluateeInfo = { 
  name: 'นายรักเรียน เพียรศึกษา', 
  position: 'ครูผู้ช่วย' 
}

const submittedFiles = ref([
  {
    id: 101,
    name: 'แผนการสอน_Week1-4.pdf',
    type: 'pdf',
    url: 'https://example.com/plan.pdf',
    status: 'pending',
    related_indicators: [
      { id: 1, code: 'T1-PLAN', name: 'แผนการจัดการเรียนรู้', type: 'score_1_4', score: null, note: '' },
      { id: 4, code: 'T1-REFLECT', name: 'บันทึกหลังการสอน', type: 'yes_no', yes_no_val: null, note: '' }
    ]
  },
  {
    id: 102,
    name: 'รูปถ่าย_บรรยากาศในชั้นเรียน.jpg',
    type: 'image',
    url: 'https://placehold.co/600x400',
    status: 'pending',
    related_indicators: [
      { id: 6, code: 'T2-CHART', name: 'การจัดป้ายนิเทศ/ตารางเวร', type: 'yes_no', yes_no_val: null, note: '' },
      { id: 2, code: 'T1-MEDIA', name: 'สื่อการเรียนรู้', type: 'score_1_4', score: null, note: '' }
    ]
  },
  {
    id: 103,
    name: 'เกียรติบัตร_อบรมAI.pdf',
    type: 'pdf',
    url: '',
    status: 'graded',
    related_indicators: [
      { id: 10, code: 'T3-CERT', name: 'การพัฒนาตนเอง', type: 'yes_no', yes_no_val: 'yes', note: 'ดีมาก พัฒนาตรงสาย' }
    ]
  }
])

// State
const dialog = ref(false)
const currentFile = ref(null)

// Methods
const openReview = (file) => {
  currentFile.value = file
  dialog.value = true
}

const saveScoreForFile = () => {
  currentFile.value.status = 'graded'
  
  const payload = {
    file_id: currentFile.value.id,
    results: currentFile.value.related_indicators.map(i => ({
      indicator_id: i.id,
      score: i.score,
      yes_no: i.yes_no_val,
      note: i.note
    }))
  }
  console.log('Saving...', payload)
  
  dialog.value = false
}

const isFileComplete = (file) => {
  if (!file) return false
  return file.related_indicators.every(i => 
    (i.type === 'score_1_4' && i.score) || 
    (i.type === 'yes_no' && i.yes_no_val)
  )
}
</script>

<style scoped>
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

/* Custom scrollbar for assessment section */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: #f8fafc;
}
</style>