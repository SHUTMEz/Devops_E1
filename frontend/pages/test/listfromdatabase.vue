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
              <v-icon icon="mdi-database" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">User Database Management</h1>
              <p class="text-gray-600 text-sm">Complete User Data Management System</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Total Users</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ userdata.length }}</p>
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
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">User Database</h2>
            <p class="text-sm text-gray-600">Complete user management with CRUD operations</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add User</span>
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

        <!-- User Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="user in userdata" 
            :key="user.id"
            class="bg-white rounded-kawaii-xl p-6 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-bold text-kawaii-charcoal text-lg">{{ user.name_th }}</h3>
                  <span class="bg-kawaii-cream text-kawaii-charcoal text-xs px-2 py-1 rounded-full font-semibold">{{ user.role }}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ user.email }}</p>
                <div class="flex items-center space-x-4 mb-3">
                  <span class="text-xs text-gray-500">ID: {{ user.id }}</span>
                  <span class="text-xs text-gray-500">Status: {{ user.status }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-xs text-gray-500">
                    <div>Created: {{ formatDate(user.created_at) }}</div>
                    <div>Updated: {{ formatDate(user.updated_at) }}</div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="edit(user.id)"
                      class="text-kawaii-blue hover:text-kawaii-pink transition-colors"
                    >
                      <v-icon icon="mdi-pencil" size="18"></v-icon>
                    </button>
                    <button 
                      @click="remove(user.id)"
                      class="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <v-icon icon="mdi-delete" size="18"></v-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-16 h-16 bg-gradient-to-br from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg">
                <v-icon icon="mdi-account" size="24" class="text-white"></v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="userdata.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
            <v-icon icon="mdi-database-off" size="48" class="text-gray-400"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Users Found</h3>
          <p class="text-gray-600 mb-6">No user data available in the database.</p>
          <button 
            @click="add"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            Add Your First User
          </button>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Users</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ userdata.length }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-pink-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-account-multiple" size="24" class="text-kawaii-pink"></v-icon>
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
              <p class="text-sm text-gray-600 mb-1">Roles</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getUniqueRoles }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-blue-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-badge-account" size="24" class="text-kawaii-blue"></v-icon>
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
            <p class="text-sm text-gray-600">Manage your user database</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add User</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Users</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ userdata.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Active Users</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getActiveUsers }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Roles</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getUniqueRoles }}</p>
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
              <v-icon icon="mdi-account-edit" size="24"></v-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
              <p class="text-sm opacity-90">{{ isEditing ? 'Update user information' : 'Add new user to database' }}</p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formModel.email"
                label="อีเมล"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
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
                v-model="formModel.name_th"
                label="ชื่อ"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="formModel.role"
                :items="['admin', 'user', 'evaluator', 'evaluatee']"
                label="บทบาท"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-badge-account"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="formModel.status"
                :items="['1', '0']"
                label="สถานะ"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-checkbox-marked-circle"
              ></v-select>
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

const currentYear = new Date().getFullYear()

function createNewRecord() {
  return {
    email: '',
    name_th: '',
    role: '',
    status: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

const userdata = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

// Computed properties for statistics
const getActiveUsers = computed(() => {
  return userdata.value.filter(user => user.status === '1').length
})

const getUniqueRoles = computed(() => {
  const roles = new Set(userdata.value.map(user => user.role))
  return roles.size
})

const getAverageStatus = computed(() => {
  if (userdata.value.length === 0) return 0
  const total = userdata.value.reduce((sum, user) => sum + parseInt(user.status), 0)
  return (total / userdata.value.length).toFixed(1)
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
    const { data } = await axios.get("http://localhost:7000/api/users/list_all_users")
    userdata.value = data.list
  } catch (err) {
    console.error('Error loading user data:', err)
    // Fallback to sample data
    reset()
  }
})

function add() {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id) {
  const found = userdata.value.find(user => user.id === id)
  formModel.value = {
    id: found.id,
    email: found.email,
    name_th: found.name_th,
    role: found.role,
    status: found.status,
    created_at: found.created_at,
    updated_at: found.updated_at,
  }
  dialog.value = true
}

function remove(id) {
  const index = userdata.value.findIndex(user => user.id === id)
  userdata.value.splice(index, 1)
}

function save() {
  if (isEditing.value) {
    const index = userdata.value.findIndex(user => user.id === formModel.value.id)
    userdata.value[index] = formModel.value
  } else {
    formModel.value.id = userdata.value.length + 1
    userdata.value.push(formModel.value)
  }
  dialog.value = false
}

function reset() {
  dialog.value = false
  formModel.value = createNewRecord()
  userdata.value = [
    { id: 1, email: 'user1@example.com', name_th: 'User One', role: 'user', status: '1', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
    { id: 2, email: 'admin@example.com', name_th: 'Admin User', role: 'admin', status: '1', created_at: '2024-01-02T00:00:00Z', updated_at: '2024-01-02T00:00:00Z' },
  ]
}

function clearAll() {
  userdata.value = []
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