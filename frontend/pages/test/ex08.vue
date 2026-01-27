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
              <v-icon icon="mdi-school" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 08</h1>
              <p class="text-gray-600 text-sm">Test Page</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Page</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ name }}</p>
              <p class="text-sm text-gray-500 mt-1">Status: Active</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 08</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Page Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Page Name</p>
                <p class="text-2xl font-bold text-kawaii-charcoal">{{ name }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Status</p>
                <p class="text-2xl font-bold text-kawaii-mint">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Feature 1 -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
            <v-icon icon="mdi-information" size="24"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2 text-center">Information</h3>
          <p class="text-sm text-gray-600 text-center">{{ message }}</p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
            <v-icon icon="mdi-tag" size="24"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2 text-center">Page Name</h3>
          <p class="text-2xl font-bold text-kawaii-charcoal text-center">{{ name }}</p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-kawaii-mint to-kawaii-green rounded-full mx-auto mb-4 text-white shadow-lg">
            <v-icon icon="mdi-check-circle" size="24"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2 text-center">Status</h3>
          <p class="text-2xl font-bold text-kawaii-mint text-center">Active</p>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Page Details</h3>
            <p class="text-sm text-gray-600">This is a simple test page with Kawaii Modern styling</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="toggleMessage"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-refresh" size="18"></v-icon>
              <span>Toggle Message</span>
            </button>
            <button 
              @click="resetMessage"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-undo" size="18"></v-icon>
              <span>Reset</span>
            </button>
          </div>
        </div>
        
        <!-- Dynamic Content -->
        <div v-if="showDetails" class="mt-6 bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Dynamic Content</h4>
          <p class="text-sm text-gray-600">This content appears when you toggle the message</p>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
              <p class="text-sm text-gray-600">Current Time</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ currentTime }}</p>
            </div>
            <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
              <p class="text-sm text-gray-600">Page Load Count</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ loadCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            message: "This is Exam 08 page",
            name: "Exam08",
            showDetails: false,
            currentTime: new Date().toLocaleString('th-TH'),
            loadCount: 1
        };
    },
    mounted() {
        // Update time every second
        this.timeInterval = setInterval(() => {
            this.currentTime = new Date().toLocaleString('th-TH')
        }, 1000)
        
        // Increment load count
        this.loadCount++
    },
    beforeUnmount() {
        clearInterval(this.timeInterval)
    },
    methods: {
        toggleMessage() {
            this.showDetails = !this.showDetails
            this.message = this.showDetails 
                ? "This is Exam 08 page with dynamic content!" 
                : "This is Exam 08 page"
        },
        resetMessage() {
            this.showDetails = false
            this.message = "This is Exam 08 page"
        }
    }
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