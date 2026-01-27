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
              <v-icon icon="mdi-format-list-bulleted" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Category Management</h1>
              <p class="text-gray-600 text-sm">Complete Category Data Management System</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Total Categories</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ categories.length }}</p>
              <p class="text-sm text-gray-500 mt-1">Database records</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Data Table Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Category Database</h2>
            <p class="text-sm text-gray-600">Complete category management with CRUD operations</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add Category</span>
            </button>
            <button 
              @click="reset"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-refresh" size="18"></v-icon>
              <span>Reset</span>
            </button>
          </div>
        </div>

        <!-- Category Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="bg-white rounded-kawaii-xl p-6 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-bold text-kawaii-charcoal text-lg">{{ category.name_th }}</h3>
                  <span class="bg-kawaii-cream text-kawaii-charcoal text-xs px-2 py-1 rounded-full font-semibold">{{ category.code }}</span>
                </div>
                <div class="flex items-center space-x-4 mb-3">
                  <span class="text-xs text-gray-500">ID: {{ category.id }}</span>
                  <span class="text-xs text-gray-500">Created: {{ formatDate(category.created_at) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <div>Year: {{ category.year || 'N/A' }}</div>
                    <div>Pages: {{ category.pages || 'N/A' }}</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="edit(category.id)"
                      class="text-kawaii-blue hover:text-kawaii-pink transition-colors"
                    >
                      <v-icon icon="mdi-pencil" size="18"></v-icon>
                    </button>
                    <button 
                      @click="openConfirm(category.id)"
                      class="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <v-icon icon="mdi-delete" size="18"></v-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg">
                <v-icon icon="mdi-tag" size="24" class="text-white"></v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="categories.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
            <v-icon icon="mdi-format-list-bulleted-off" size="48" class="text-gray-400"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Categories Found</h3>
          <p class="text-gray-600 mb-6">No category data available in the database.</p>
          <button 
            @click="add"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            Add Your First Category
          </button>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Categories</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ categories.length }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-pink-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-format-list-bulleted" size="24" class="text-kawaii-pink"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Unique Codes</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getUniqueCodes }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-lavender-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-barcode" size="24" class="text-kawaii-lavender"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Average Year</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getAverageYear }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-blue-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-calendar" size="24" class="text-kawaii-blue"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Pages</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getTotalPages }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-mint-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-format-list-numbered" size="24" class="text-kawaii-mint"></v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Quick Actions</h3>
            <p class="text-sm text-gray-600">Manage your category database</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add Category</span>
            </button>
            <button 
              @click="clearAll"
              class="bg-red-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-delete-sweep" size="18"></v-icon>
              <span>Clear All</span>
            </button>
          </div>
        </div>
        
        <!-- Dynamic Content -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Categories</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ categories.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Unique Codes</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getUniqueCodes }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Average Year</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getAverageYear }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Pages</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getTotalPages }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit/Add Dialog -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card class="rounded-kawaii-xl">
        <v-card-title class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white rounded-t-kawaii-xl">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <v-icon icon="mdi-tag-edit" size="24"></v-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Category' : 'Add New Category' }}</h3>
              <p class="text-sm opacity-90">{{ isEditing ? 'Update category information' : 'Add new category to database' }}</p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formModel.id"
                label="ID"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-numeric"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formModel.code"
                label="Code"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-barcode"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formModel.name_th"
                label="ชื่อไทย"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-text"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formModel.created_at"
                label="สร้างเมื่อ"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formModel.year"
                type="number"
                label="Year"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formModel.pages"
                type="number"
                label="Pages"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-format-list-numbered"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="bg-kawaii-cream rounded-b-kawaii-xl">
          <v-btn 
            text="Cancel" 
            variant="tonal" 
            color="gray"
            @click="dialog = false"
            class="rounded-kawaii-lg"
          ></v-btn>

          <v-spacer></v-spacer>

          <v-btn 
            :text="isEditing ? 'Update' : 'Save'"
            color="kawaii-pink"
            @click="save"
            class="rounded-kawaii-lg font-semibold"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Modal -->
    <v-dialog v-model="confirmModal" max-width="500">
      <v-card class="rounded-kawaii-xl">
        <v-card-title class="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-kawaii-xl">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <v-icon icon="mdi-alert-circle" size="24"></v-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold">ยืนยันการลบข้อมูล</h3>
              <p class="text-sm opacity-90">คุณต้องการลบข้อมูลนี้หรือไม่?</p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pt-6">
          <p class="text-sm text-gray-600">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
        </v-card-text>

        <v-card-actions class="bg-kawaii-cream rounded-b-kawaii-xl">
          <v-btn 
            text="ยกเลิก" 
            variant="tonal" 
            color="gray"
            @click="confirmModal = false"
            class="rounded-kawaii-lg"
          ></v-btn>

          <v-spacer></v-spacer>

          <v-btn 
            text="ลบ"
            color="red"
            @click="remove(deleteId)"
            class="rounded-kawaii-lg font-semibold"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef, toRef, computed } from 'vue'
import axios from 'axios'

const currentYear = new Date().getFullYear()

function createNewRecord() {
  return {
    id: '',
    code: '',
    name_th: '',
    created_at: new Date().toISOString(),
    year: currentYear,
    pages: 1,
  }
}

const categories = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)
const confirmModal = ref(false)
const deleteId = ref(null)

// Computed properties for statistics
const getUniqueCodes = computed(() => {
  const codes = new Set(categories.value.map(cat => cat.code))
  return codes.size
})

const getAverageYear = computed(() => {
  if (categories.value.length === 0) return 0
  const total = categories.value.reduce((sum, cat) => sum + (cat.year || 0), 0)
  return Math.round(total / categories.value.length)
})

const getTotalPages = computed(() => {
  return categories.value.reduce((sum, cat) => sum + (cat.pages || 0), 0)
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:7000/api/users/list_all")
    categories.value = data.list
  } catch (err) {
    console.error('Error loading categories:', err)
    // Fallback to sample data
    reset()
  }
})

function add() {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id) {
  const found = categories.value.find(cat => cat.id === id)
  formModel.value = {
    id: found.id,
    code: found.code,
    name_th: found.name_th,
    created_at: found.created_at,
    year: found.year,
    pages: found.pages,
  }
  dialog.value = true
}

function openConfirm(id) {
  deleteId.value = id
  confirmModal.value = true
}

async function remove(id) {
  try {
    // ถ้ามี API endpoint สำหรับการลบ
    // const { data } = await axios.delete(`http://localhost:7000/api/cat/catdelete/${id}`)
    // console.log("Response -> ", data)
    
    // สำหรับตอนนี้ลบจาก array โดยตรง
    const index = categories.value.findIndex(cat => cat.id === id)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
    
    confirmModal.value = false
  } catch (err) {
    console.error('Error deleting category:', err)
  }
}

function save() {
  if (isEditing.value) {
    const index = categories.value.findIndex(cat => cat.id === formModel.value.id)
    categories.value[index] = formModel.value
  } else {
    formModel.value.id = categories.value.length + 1
    categories.value.push(formModel.value)
  }
  dialog.value = false
}

function reset() {
  dialog.value = false
  formModel.value = createNewRecord()
  categories.value = [
    { id: 1, code: 'CAT01', name_th: 'To Kill a Mockingbird', created_at: '2024-01-01T00:00:00Z', year: 1960, pages: 281 },
    { id: 2, code: 'CAT02', name_th: '1984', created_at: '2024-01-02T00:00:00Z', year: 1949, pages: 328 },
  ]
}

function clearAll() {
  categories.value = []
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
</style>