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
              <v-icon icon="mdi-account-tie" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Evaluator Management</h1>
              <p class="text-gray-600 text-sm">Complete Evaluator User Management System</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Total Evaluators</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ categories.length }}</p>
              <p class="text-sm text-gray-500 mt-1">Evaluator records</p>
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
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Evaluator Database</h2>
            <p class="text-sm text-gray-600">Complete evaluator management with CRUD operations</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus-circle" size="18"></v-icon>
              <span>Add Evaluator</span>
            </button>
            <button 
              @click="fetchData"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-refresh" size="18"></v-icon>
              <span>Reload Data</span>
            </button>
          </div>
        </div>

        <!-- Evaluator Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="evaluator in categories" 
            :key="evaluator.id"
            class="bg-white rounded-kawaii-xl p-6 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-bold text-kawaii-charcoal text-lg">{{ evaluator.name_th }}</h3>
                  <span :class="getStatusClass(evaluator.status)">{{ evaluator.status }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ evaluator.email }}</p>
                <div class="flex items-center space-x-4 mb-3">
                  <span class="text-xs text-gray-500">ID: {{ evaluator.id }}</span>
                  <span class="text-xs text-gray-500">Created: {{ formatDate(evaluator.created_at) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <div>Role: {{ evaluator.role || 'evaluator' }}</div>
                    <div>Department: {{ evaluator.department_id || 'N/A' }}</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="edit(evaluator.id)"
                      class="text-kawaii-blue hover:text-kawaii-pink transition-colors"
                    >
                      <v-icon icon="mdi-pencil" size="18"></v-icon>
                    </button>
                    <button 
                      @click="remove(evaluator.id)"
                      class="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <v-icon icon="mdi-delete" size="18"></v-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg">
                <v-icon icon="mdi-account-tie" size="24" class="text-white"></v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="categories.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
            <v-icon icon="mdi-account-tie-off" size="48" class="text-gray-400"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Evaluators Found</h3>
          <p class="text-gray-600 mb-6">No evaluator data available in the database.</p>
          <button 
            @click="add"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            Add Your First Evaluator
          </button>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Evaluators</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ categories.length }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-pink-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-account-tie" size="24" class="text-kawaii-pink"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Active Users</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getActiveUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-lavender-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-account-check" size="24" class="text-kawaii-lavender"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Disabled Users</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getDisabledUsers }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-blue-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-account-off" size="24" class="text-kawaii-blue"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Avg. Status</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getAverageStatus }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-mint-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-chart-line" size="24" class="text-kawaii-mint"></v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Quick Actions</h3>
            <p class="text-sm text-gray-600">Manage your evaluator database</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus-circle" size="18"></v-icon>
              <span>Add Evaluator</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Evaluators</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ categories.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Active Users</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getActiveUsers }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Disabled Users</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getDisabledUsers }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Avg. Status</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getAverageStatus }}</p>
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
              <v-icon :icon="isEditing ? 'mdi-pencil-box' : 'mdi-account-plus'" size="24"></v-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Evaluator' : 'Add New Evaluator' }}</h3>
              <p class="text-sm opacity-90">{{ isEditing ? 'Update evaluator information' : 'Add new evaluator to database' }}</p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formModel.email"
                label="Email"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="formModel.status"
                :items="['active', 'disabled']"
                label="Status"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-circle-medium"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formModel.name_th"
                label="ชื่อไทย"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-account-outline"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formModel.password_hash"
                :type="visible ? 'text' : 'password'"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visible = !visible"
                label="Password"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-lock-outline"
                hint="ปล่อยว่างหากไม่ต้องการเปลี่ยนรหัสผ่าน"
                persistent-hint
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
  </div>
</template>

<script setup>
import { onMounted, ref, shallowRef, toRef, computed } from 'vue'
import axios from 'axios'

const categories = ref([])
const dialog = shallowRef(false)
const visible = ref(false)
const formModel = ref({ email: '', name_th: '', password_hash: '', status: 'active' })
const isEditing = toRef(() => !!formModel.value.id)

// Computed properties for statistics
const getActiveUsers = computed(() => {
  return categories.value.filter(user => user.status === 'active').length
})

const getDisabledUsers = computed(() => {
  return categories.value.filter(user => user.status === 'disabled').length
})

const getAverageStatus = computed(() => {
  if (categories.value.length === 0) return 0
  const activeCount = categories.value.filter(user => user.status === 'active').length
  return ((activeCount / categories.value.length) * 100).toFixed(1) + '%'
})

const getStatusClass = (status) => {
  if (status === 'active') {
    return 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold'
  } else {
    return 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-semibold'
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const fetchData = async () => {
  try {
    const { data } = await axios.get("http://localhost:7000/api/users/list_users_all_evaluator")
    categories.value = data.list
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

onMounted(async () => {
  await fetchData()
})

function add() {
  formModel.value = { email: '', name_th: '', password_hash: '', status: 'active' }
  dialog.value = true
}

async function edit(id) {
  const found = categories.value.find(item => item.id === id)
  if (found) {
    formModel.value = { ...found, password_hash: '' } // เคลียร์รหัส
    dialog.value = true
  }
}

async function remove(id) {
  if (!confirm("แน่ใจนะหนุ่มว่าจะลบ?")) return
  try {
    await axios.delete(`http://localhost:7000/api/users/deleteusers/${id}`)
    await fetchData()
  } catch (error) {
    console.error("Delete error:", error)
  }
}

async function save() {
  try {
    if (isEditing.value) {
      await axios.put("http://localhost:7000/api/users/usersedit", formModel.value)
    } else {
      await axios.post("http://localhost:7000/api/users/createevaluator", formModel.value)
    }
    dialog.value = false
    await fetchData()
  } catch (error) {
    console.error("Save error:", error)
  }
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