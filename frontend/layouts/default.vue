<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenu } from '~/composables/useMenu'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const drawer = ref(true)
const authStore = useAuthStore()

// ดึง Role จาก Store
const role = computed(() => authStore.user?.role || '')

// เรียกใช้ Composable
const { menu } = useMenu(role)

// ข้อมูลโปรไฟล์
const userProfile = computed(() => ({
  name: authStore.user?.name_th || 'Guest',
  email: authStore.user?.email || '',
  initials: (authStore.user?.name_th || 'G').charAt(0)
}))

onMounted(() => {
  authStore.hydrateFromStorage()
})

// ฟังก์ชัน Logout
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-kawaii-cream">
    <!-- Animated Background -->
    <div class="fixed inset-0 pointer-events-none" ></div>
    
    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.display.mdAndUp"
      :temporary="$vuetify.display.smAndDown"
      class="bg-gradient-to-b from-kawaii-pink to-kawaii-lavender"
      width="280"
      elevation="10"
    >
      <div class="p-6 relative overflow-hidden">
        <!-- Animated Background Elements -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div class="absolute top-20 right-0 w-24 h-24 bg-kawaii-lavender rounded-full blur-xl animate-pulse" style="animation-delay: 1s"></div>
          <div class="absolute bottom-0 left-10 w-20 h-20 bg-white rounded-full blur-xl animate-pulse" style="animation-delay: 2s"></div>
        </div>

        <!-- Logo & Brand -->
        <div class="flex items-center space-x-4 mb-8 relative z-10">
          <div class="w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center animate-float-gentle">
            <span class="text-kawaii-pink font-extrabold text-lg">V</span>
          </div>
          <div>
            <h2 class="text-xl font-bold  tracking-wide">VEC Evaluation</h2>
            <p class="text-xs /90 font-light">ระบบประเมินบุคลากร</p>
          </div>
        </div>

        <!-- User Profile in Sidebar -->
        <div class="bg-white/15 rounded-2xl p-5 mb-6 backdrop-blur-md border border-white/20 relative z-10">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br from-white to-kawaii-pink rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/50">
              <span class="text-kawaii-pink font-bold text-lg">{{ userProfile.initials }}</span>
            </div>
            <div class="">
              <p class="font-semibold text-sm">{{ userProfile.name }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <span class="px-2 py-1 bg-white/20 rounded-full text-xs /90 border border-white/30">
                  {{ role }}
                </span>
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="space-y-2 relative z-10">
          <div v-for="section in menu" :key="section.label" class="space-y-3">
            <div class="flex items-center space-x-2 px-3 py-2">
              <div class="w-1 h-6 bg-white/30 rounded-full"></div>
              <p class="text-xs font-semibold /80 uppercase tracking-wider">
                {{ section.label }}
              </p>
            </div>
            <div v-for="item in section.items" :key="item.label" class="space-y-1">
              <router-link
                :to="item.to"
                class="flex items-center space-x-3 px-4 py-3 rounded-xl  hover:bg-white/20 hover:shadow-lg transition-all duration-300 transform hover:translate-x-1 group"
              >
                <div class="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <v-icon :icon="item.icon" size="20" class=" group-hover:text-kawaii-pink transition-colors duration-300"></v-icon>
                </div>
                <div class="flex-1">
                  <span class="text-sm font-medium group-hover:text-kawaii-pink transition-colors duration-300">{{ item.label }}</span>
                </div>
                <v-icon icon="mdi-chevron-right" size="16" class="/60 group-hover:text-kawaii-pink transition-colors duration-300"></v-icon>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Decorative Divider -->
        <div class="my-6 relative z-10">
          <div class="border-t border-white/20"></div>
          <div class="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div class="w-6 h-6 bg-kawaii-pink rounded-full shadow-lg animate-bounce"></div>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="relative z-10">
          <button
            @click="logout"
            class="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <div class="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center group-hover:from-red-500 group-hover:to-red-700 transition-all duration-300">
              <v-icon icon="mdi-logout" size="20" class=""></v-icon>
            </div>
            <div class="flex-1">
              <span class="text-sm font-medium  group-hover:text-red-200 transition-colors duration-300">ออกจากระบบ</span>
            </div>
            <v-icon icon="mdi-logout" size="16" class="/80 group-hover: transition-colors duration-300"></v-icon>
          </button>
        </div>

        <!-- Floating Elements -->
        <div class="absolute bottom-4 left-4 right-4 flex justify-between opacity-30">
          <div class="w-4 h-4 bg-white rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-3 h-3 bg-kawaii-lavender rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
          <div class="w-4 h-4 bg-white rounded-full animate-bounce" style="animation-delay: 1s"></div>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Header -->
    <header class="relative bg-white/80 backdrop-blur-md border-b border-kawaii-pink-light shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo & Brand -->
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full flex items-center justify-center shadow-lg animate-float-gentle">
              <span class=" font-bold text-sm">V</span>
            </div>
            <div>
              <h1 class="text-lg font-bold text-kawaii-charcoal">VEC Evaluation</h1>
              <p class="text-xs text-gray-500">ระบบประเมินบุคลากร</p>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <!-- Toggle Button for Mobile -->
            <button
              v-if="$vuetify.display.smAndDown"
              @click="drawer = !drawer"
              class="flex items-center space-x-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 border border-kawaii-pink-light"
            >
              <v-icon icon="mdi-menu" size="20" class="text-kawaii-pink"></v-icon>
              <span class="text-sm font-medium text-kawaii-charcoal">เมนู</span>
            </button>

            <!-- User Info -->
            
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative bg-white/50 backdrop-blur-sm border-t border-kawaii-pink-light">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-sm text-gray-500">
          <div class="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md border border-kawaii-pink-light">
            <span class="animate-wiggle">✨</span>
            <span>© 2025 VEC Skills — Evaluation System</span>
            <span class="animate-wiggle" style="animation-delay: 0.5s">✨</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

.animate-float-gentle {
  animation: float-gentle 4s ease-in-out infinite;
}

.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
}
</style>
