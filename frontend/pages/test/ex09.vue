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
              <v-icon icon="mdi-code-braces" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 09</h1>
              <p class="text-gray-600 text-sm">Vue 3 Composition API</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Framework</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">Vue 3</p>
              <p class="text-sm text-gray-500 mt-1">Composition API</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 09</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Dynamic Data</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Message</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ message }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Name</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Composition API Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- ref Feature -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-kawaii-pink to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
            <v-icon icon="mdi-variable" size="24"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2 text-center">ref() Function</h3>
          <p class="text-sm text-gray-600 text-center mb-4">Reactive references for primitive values</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Example:</h4>
            <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const message = ref("Hello Vue 3")
const name = ref("")
name.value = "Ex Ppsspp"</code></pre>
          </div>
          
          <div class="mt-4 space-y-2">
            <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
              <span class="text-sm text-gray-600">message.value:</span>
              <span class="font-semibold text-kawaii-charcoal">{{ message }}</span>
            </div>
            <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-3 border border-gray-200">
              <span class="text-sm text-gray-600">name.value:</span>
              <span class="font-semibold text-kawaii-charcoal">{{ name }}</span>
            </div>
          </div>
        </div>

        <!-- onMounted Feature -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
            <v-icon icon="mdi-hook" size="24"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2 text-center">onMounted() Hook</h3>
          <p class="text-sm text-gray-600 text-center mb-4">Lifecycle hook for component mounting</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Example:</h4>
            <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>onMounted(() => {
  console.log('Component mounted!')
})</code></pre>
          </div>
          
          <div class="mt-4 bg-white rounded-kawaii-lg p-3 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Component Status:</span>
              <span class="font-semibold text-kawaii-mint">Mounted</span>
            </div>
            <div class="flex items-center justify-between mt-2">
              <span class="text-sm text-gray-600">Mount Time:</span>
              <span class="text-sm text-kawaii-charcoal">{{ mountTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Demo</h3>
            <p class="text-sm text-gray-600">Try updating the reactive values</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="updateMessage"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-message-text" size="18"></v-icon>
              <span>Update Message</span>
            </button>
            <button 
              @click="updateName"
              class="bg-gradient-to-r from-kawaii-blue to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-blue hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-account" size="18"></v-icon>
              <span>Update Name</span>
            </button>
            <button 
              @click="resetValues"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-undo" size="18"></v-icon>
              <span>Reset</span>
            </button>
          </div>
        </div>
        
        <!-- Dynamic Content -->
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Current Values</h4>
            <div class="space-y-2">
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <p class="text-sm text-gray-600">Message:</p>
                <p class="font-semibold text-kawaii-charcoal">{{ message }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <p class="text-sm text-gray-600">Name:</p>
                <p class="font-semibold text-kawaii-charcoal">{{ name }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Composition API Benefits</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>✓ Better TypeScript support</li>
              <li>✓ More flexible code organization</li>
              <li>✓ Better reusability with composable functions</li>
              <li>✓ More intuitive reactive system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const message = ref("Hello Vue 3")
const name = ref("");
name.value = "Ex Ppsspp"

const mountTime = ref(new Date().toLocaleTimeString('th-TH'))
const originalMessage = message.value
const originalName = name.value

onMounted(() => {
  console.log('Component mounted!')
  mountTime.value = new Date().toLocaleTimeString('th-TH')
})

const updateMessage = () => {
  message.value = message.value === "Hello Vue 3" 
    ? "Updated with Composition API!" 
    : "Hello Vue 3"
}

const updateName = () => {
  name.value = name.value === "Ex Ppsspp" 
    ? "Vue 3 Developer" 
    : "Ex Ppsspp"
}

const resetValues = () => {
  message.value = originalMessage
  name.value = originalName
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