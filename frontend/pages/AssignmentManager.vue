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
              <v-icon icon="mdi-link-variant-plus" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">{{ isEditing ? 'แก้ไขการจับคู่' : 'จับคู่การประเมิน' }}</h1>
              <p class="text-gray-600 text-sm">Assignment Management</p>
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

      <!-- Data Content -->
      <div v-else class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <!-- Form Section -->
          <div class="lg:col-span-1">
            <div class="bg-kawaii-cream rounded-kawaii-xl p-6 border border-kawaii-pink-light">
              <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">
                <v-icon icon="mdi-form-dropdown" size="20" class="mr-2"></v-icon>
                ฟอร์มการจับคู่
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-kawaii-charcoal mb-2">เลือกรอบการประเมิน</label>
                  <select 
                    v-model="selectedPeriod"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  >
                    <option value="">เลือกรอบการประเมิน</option>
                    <option v-for="period in periods" :key="period.id" :value="period.id">
                      {{ period.name_th }}
                    </option>
                  </select>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-kawaii-charcoal mb-2">เลือกกรรมการ (Evaluator)</label>
                    <select 
                      v-model="form.evaluator_id"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                    >
                      <option value="">เลือกกรรมการ</option>
                      <option v-for="evaluator in evaluators" :key="evaluator.id" :value="evaluator.id">
                        {{ evaluator.name_th }} ({{ evaluator.role }})
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-kawaii-charcoal mb-2">เลือกผู้รับการประเมิน (Evaluatee)</label>
                    <select 
                      v-model="form.evaluatee_id"
                      class="w-full px-4 py-3 bg-white border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                    >
                      <option value="">เลือกผู้รับการประเมิน</option>
                      <option v-for="evaluatee in evaluatees" :key="evaluatee.id" :value="evaluatee.id">
                        {{ evaluatee.name_th }} ({{ evaluatee.dept_name || 'ไม่ระบุแผนก' }})
                      </option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col gap-3 mt-4">
                  <button 
                    @click="saveAssignment"
                    :disabled="!isValidForm || submitting"
                    class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center justify-center space-x-2"
                  >
                    <v-icon :icon="isEditing ? 'mdi-content-save-edit' : 'mdi-plus-circle'" size="18"></v-icon>
                    <span>{{ isEditing ? 'บันทึกการแก้ไข' : 'จับคู่' }}</span>
                    <v-icon v-if="submitting" icon="mdi-loading" size="18" class="animate-spin"></v-icon>
                  </button>

                  <button 
                    v-if="isEditing"
                    @click="cancelEdit"
                    class="bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <v-icon icon="mdi-close" size="18"></v-icon>
                    <span>ยกเลิก</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Section -->
          <div class="lg:col-span-2">
            <div class="bg-kawaii-cream rounded-kawaii-xl p-6 border border-kawaii-pink-light">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-kawaii-charcoal">
                  รายการจับคู่ ({{ filteredAssignments.length }} คู่)
                </h3>
                <div class="flex items-center space-x-2">
                  <v-icon icon="mdi-magnify" size="18" class="text-gray-500"></v-icon>
                  <input 
                    v-model="search"
                    placeholder="ค้นหา..."
                    class="px-3 py-2 bg-white border border-gray-200 rounded-kawaii focus:outline-none focus:ring-2 focus:ring-kawaii-pink focus:border-transparent transition-all duration-300"
                  >
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-kawaii-pink-light">
                      <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ผู้ประเมิน</th>
                      <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">ผู้รับการประเมิน</th>
                      <th class="text-left py-3 px-4 font-semibold text-kawaii-charcoal">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="item in filteredAssignments" 
                      :key="item.id"
                      class="border-b border-kawaii-pink-light hover:bg-kawaii-pink-light transition-colors duration-200"
                    >
                      <td class="py-4 px-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            ER
                          </div>
                          <div>
                            <p class="font-semibold text-kawaii-charcoal">{{ item.evaluator_name }}</p>
                            <p class="text-sm text-gray-600">{{ item.evaluator_role }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            EE
                          </div>
                          <div>
                            <p class="font-semibold text-kawaii-charcoal">{{ item.evaluatee_name }}</p>
                            <p class="text-sm text-gray-600">{{ item.evaluatee_dept || '-' }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="py-4 px-4">
                        <div class="flex items-center space-x-2">
                          <button 
                            @click="editAssignment(item)"
                            class="bg-kawaii-cream border border-kawaii-pink-light text-kawaii-pink font-medium px-3 py-2 rounded-kawaii hover:bg-kawaii-pink-light transition-colors duration-200 flex items-center space-x-2"
                          >
                            <v-icon icon="mdi-pencil" size="16"></v-icon>
                            <span>แก้ไข</span>
                          </button>
                          <button 
                            @click="removeAssignment(item.id)"
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

              <div v-if="filteredAssignments.length === 0" class="text-center py-8 text-gray-500">
                ยังไม่มีข้อมูลการจับคู่
              </div>
            </div>
          </div>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// State Variables
const currentUser = ref({ name_th: 'Admin', role: 'admin' })
const periods = ref([]);
const evaluators = ref([]);
const evaluatees = ref([]);
const assignments = ref([]);

const selectedPeriod = ref(null);
const form = ref({ evaluator_id: null, evaluatee_id: null });
const search = ref('');
const loading = ref(false);
const submitting = ref(false);
const error = ref('');

// ✅ State สำหรับการแก้ไข
const isEditing = ref(false);
const editingId = ref(null);

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
});

// --- Computed ---
const filteredAssignments = computed(() => {
  if (!selectedPeriod.value) return [];
  return assignments.value.filter(a => a.period_id === selectedPeriod.value);
});

const isValidForm = computed(() => {
  return selectedPeriod.value && form.value.evaluator_id && form.value.evaluatee_id;
});

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

  await fetchData()
};

// --- API Helpers ---
const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
};

const fetchData = async () => {
  loading.value = true;
  error.value = '';
  try {
    const header = getAuthHeader();
    const [resPeriods, resEvaluators, resEvaluatees, resAssignments] = await Promise.all([
        axios.get('http://localhost:7000/api/admin/periods', header),
        axios.get('http://localhost:7000/api/admin/users/evaluators', header),
        axios.get('http://localhost:7000/api/admin/users/evaluatees', header),
        axios.get('http://localhost:7000/api/admin/assignments', header)
    ]);

    periods.value = resPeriods.data;
    evaluators.value = resEvaluators.data;
    evaluatees.value = resEvaluatees.data;
    assignments.value = resAssignments.data;

    // Auto-select ปีที่ Active (ถ้ายังไม่เลือก)
    const activePeriod = periods.value.find(p => p.is_active === 1 || p.active === 1);
    if (activePeriod && !selectedPeriod.value) {
        selectedPeriod.value = activePeriod.id;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    error.value = error.response?.data?.message || 'Failed to fetch data';
    showSnackbar('โหลดข้อมูลไม่สำเร็จ', 'error');
  } finally {
    loading.value = false;
  }
};

// --- Actions ---

// 1. ฟังก์ชัน Save (ใช้ร่วมกันทั้ง Create และ Update)
const saveAssignment = async () => {
  if (!isValidForm.value) return;
  submitting.value = true;
  
  try {
    const payload = {
        period_id: selectedPeriod.value,
        evaluator_id: form.value.evaluator_id,
        evaluatee_id: form.value.evaluatee_id
    };

    if (isEditing.value) {
        // --- กรณีแก้ไข (UPDATE) ---
        await axios.put(`http://localhost:7000/api/admin/assignments/${editingId.value}`, payload, getAuthHeader());
        showSnackbar('แก้ไขข้อมูลเรียบร้อย');
    } else {
        // --- กรณีสร้างใหม่ (CREATE) ---
        await axios.post('http://localhost:7000/api/admin/assignments', payload, getAuthHeader());
        showSnackbar('จับคู่สำเร็จเรียบร้อย');
    }
    
    // โหลดตารางใหม่
    const res = await axios.get('http://localhost:7000/api/admin/assignments', getAuthHeader());
    assignments.value = res.data;

    // Reset Form
    cancelEdit(); 

  } catch (error) {
    showSnackbar(error.response?.data?.message || 'เกิดข้อผิดพลาด', 'error');
  } finally {
    submitting.value = false;
  }
};

// 2. ฟังก์ชันเริ่มแก้ไข
const editAssignment = (item) => {
    isEditing.value = true;
    editingId.value = item.id;
    
    // ดึงข้อมูลจากแถวมาใส่ฟอร์ม
    form.value = {
        evaluator_id: item.evaluator_id,
        evaluatee_id: item.evaluatee_id
    };
    
    // ปรับปีให้ตรงกับรายการที่แก้ (เผื่อดูปีอื่นอยู่)
    selectedPeriod.value = item.period_id;
};

// 3. ฟังก์ชันยกเลิกแก้ไข
const cancelEdit = () => {
    isEditing.value = false;
    editingId.value = null;
    form.value = { evaluator_id: null, evaluatee_id: null };
};

const removeAssignment = async (id) => {
  if (!confirm('ยืนยันที่จะลบการจับคู่นี้?')) return;
  try {
    await axios.delete(`http://localhost:7000/api/admin/assignments/${id}`, getAuthHeader());
    assignments.value = assignments.value.filter(a => a.id !== id);
    showSnackbar('ลบรายการเรียบร้อย');
    
    // ถ้ายกเลิกตัวที่กำลัง Edit อยู่พอดี ให้ Reset Form ด้วย
    if (editingId.value === id) cancelEdit();
    
  } catch (error) {
    showSnackbar('ลบไม่สำเร็จ', 'error');
  }
};

const showSnackbar = (text, color = 'success') => {
  snackbar.value.text = text;
  snackbar.value.color = color;
  snackbar.value.show = true;
};

onMounted(() => {
  initPage()
});

definePageMeta({
  middleware: 'auth'
})
</script>
