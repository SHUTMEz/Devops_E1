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
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">User Role Management</h1>
              <p class="text-gray-600 text-sm">Role-Based User Data Filtering</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Selected Role</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ selectedRole || 'None' }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ selectedRoleName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Main Card -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-8 mb-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">User Role Management</h1>
          <p class="text-lg text-gray-600 mb-6">Filter users by role from the database</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Role-Based Filtering</h2>
            <p class="text-sm text-gray-600 mb-4">Select a role to view users with that specific role</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Roles Available</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">{{ categories.length }}</p>
                <p class="text-xs text-gray-600 mt-1">Total roles in system</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Source</h4>
                <p class="text-sm text-kawaii-charcoal font-semibold">User Database</p>
                <p class="text-xs text-gray-600 mt-1">Role-based user filtering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Selection Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-account-multiple" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Select User Role</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Choose a role to filter and view users</p>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Role Selection -->
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h4 class="font-semibold text-kawaii-charcoal mb-4">Role Selection</h4>
            
            <!-- Dropdown -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-kawaii-charcoal mb-2">Select User Role</label>
              <select 
                v-model="selectedCode"
                class="w-full bg-white border border-gray-300 rounded-kawaii-lg px-4 py-3 text-kawaii-charcoal focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
              >
                <option value="">-- เลือก --</option>
                <option
                  v-for="c in categories"
                  :key="c.id"
                  :value="c.role"
                  class="text-kawaii-charcoal"
                >
                  {{ c.id }} - {{ c.role }}
                </option>
              </select>
            </div>

            <!-- Selected Role Info -->
            <div v-if="selectedCode" class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
              <h5 class="font-semibold text-kawaii-charcoal mb-2">Selected Role</h5>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <span class="text-gray-600">ID:</span>
                <span class="font-semibold text-kawaii-charcoal">{{ selectedRoleId }}</span>
                <span class="text-gray-600">Role:</span>
                <span class="font-semibold text-kawaii-charcoal">{{ selectedRole }}</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6 flex items-center justify-center">
            <div class="text-center">
              <button 
                @click="showData"
                :disabled="!selectedCode || loading"
                class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-4 rounded-kawaii-xl hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 text-lg"
              >
                <v-icon icon="mdi-account-search" size="24"></v-icon>
                <span>{{ loading ? 'Loading...' : 'Load Users' }}</span>
              </button>
              <p class="text-sm text-gray-600 mt-4">Click to load users for selected role</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="result.length" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-green to-kawaii-mint rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-table" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Filtered User Results</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Users filtered by role: {{ selectedRole }}</p>
        
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white rounded-kawaii-lg border border-gray-200">
            <thead class="bg-kawaii-cream">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">ID</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Email</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Name (TH)</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Role</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-kawaii-charcoal uppercase tracking-wider border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in result" :key="item.id" class="hover:bg-kawaii-cream/50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal font-semibold">{{ item.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal">{{ item.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal">{{ item.name_th }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal">{{ item.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-kawaii-charcoal">{{ item.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Showing {{ result.length }} user(s) with role {{ selectedRole }}
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-xs text-kawaii-mint font-semibold">✓ Filtered successfully</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && selectedCode && result.length === 0" class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-12 text-center mb-8">
        <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-account-search" size="48" class="text-gray-400"></v-icon>
        </div>
        <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Users Found</h3>
        <p class="text-gray-600 mb-6">No users found with role {{ selectedRole }}.</p>
        <button 
          @click="showData"
          :disabled="loading"
          class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Try Again
        </button>
      </div>

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-kawaii-xl p-8 text-center mb-8">
        <div class="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <v-icon icon="mdi-alert-circle" size="32" class="text-red-600"></v-icon>
        </div>
        <h2 class="text-xl font-semibold text-red-800 mb-2">Load Error</h2>
        <p class="text-red-600 mb-4">{{ error }}</p>
        <button 
          @click="showData"
          :disabled="loading"
          class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-2 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retry
        </button>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Current Status -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Current Status</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Status:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ status }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Selected Role:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ selectedRole || 'None' }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Roles Available:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ categories.length }}</span>
              </div>
              <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Users Loaded:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ result.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Code Example</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Role-Based User Filtering</h4>
            <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>// Load all roles for dropdown
onMounted(async () => {
  const { data } = await axios.get(
    "http://localhost:7000/api/users/list_all_users"
  );
  categories.value = data.list;
});

// Load users for selected role
const showData = async () => {
  if (!selectedCode.value) {
    alert("กรุณาเลือก code ก่อน");
    return;
  }
  
  const { data } = await axios.get(
    "http://localhost:7000/api/users/listusers?role=" + selectedCode.value
  );
  result.value = data.list;
};</code></pre>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Controls</h3>
            <p class="text-sm text-gray-600">Try selecting different roles and loading users</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="showData"
              :disabled="!selectedCode || loading"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <v-icon icon="mdi-account-search" size="18"></v-icon>
              <span>{{ loading ? 'Loading...' : 'Load Users' }}</span>
            </button>
            <button 
              @click="clearData"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-broom" size="18"></v-icon>
              <span>Clear</span>
            </button>
          </div>
        </div>
        
        <!-- Dynamic Content -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Status</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ status }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Selected Role</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ selectedRole || 'None' }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Roles</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ categories.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Users Loaded</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ result.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const categories = ref([]);    // เก็บรายการทั้งหมด (ใช้เติม dropdown)
const selectedCode = ref("");  // code ที่เลือกจาก UI
const result = ref([]);        // ผลลัพธ์ที่ดึงตาม code
const loading = ref(false);
const error = ref('');
const status = ref('Ready');

// คำนวณข้อมูลบทบาทที่เลือก
const selectedRole = computed(() => {
  if (!selectedCode.value) return '';
  const category = categories.value.find(c => c.role === selectedCode.value);
  return category ? category.role : '';
});

const selectedRoleId = computed(() => {
  if (!selectedCode.value) return '';
  const category = categories.value.find(c => c.role === selectedCode.value);
  return category ? category.id : '';
});

const selectedRoleName = computed(() => {
  if (!selectedCode.value) return '';
  const category = categories.value.find(c => c.role === selectedCode.value);
  return category ? category.role : '';
});

// โหลดรายการทั้งหมดมาเติม dropdown ตอนเปิดหน้า
onMounted(async () => {
  loading.value = true;
  error.value = '';
  status.value = 'Loading roles...';
  
  try {
    const { data } = await axios.get(
      "http://localhost:7000/api/users/list_all_users" // ไม่ส่ง code => ได้ list ทั้งหมด
    );
    categories.value = data.list; // เป็น array อยู่แล้ว
    status.value = 'Roles loaded';
  } catch (err) {
    console.error('Error loading roles:', err);
    error.value = err.message || 'Failed to load roles';
    status.value = 'Error';
  } finally {
    loading.value = false;
  }
});

// กดปุ่มแล้วดึงตาม code ที่เลือก
const showData = async () => {
  if (!selectedCode.value) {
    alert("กรุณาเลือก code ก่อน");
    return;
  }

  loading.value = true;
  error.value = '';
  status.value = 'Loading users...';
  
  try {
    const { data } = await axios.get(
      "http://localhost:7000/api/users/listusers?role=" + selectedCode.value
    );

    // data.list เป็น array อยู่แล้ว
    result.value = data.list;
    status.value = 'Users loaded';
  } catch (err) {
    console.error('Error loading users:', err);
    error.value = err.message || 'Failed to load users';
    status.value = 'Error';
  } finally {
    loading.value = false;
  }
};

const clearData = () => {
  result.value = [];
  selectedCode.value = '';
  error.value = '';
  status.value = 'Ready';
};
</script>

<style scoped>
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

th, td {
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 16px; /* เพิ่ม padding สำหรับความห่าง */
}

th:first-child, td:first-child {
  border-left: 1px solid #e5e7eb;
  border-top-left-radius: 8px;
}

th:last-child, td:last-child {
  border-right: 1px solid #e5e7eb;
  border-top-right-radius: 8px;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>