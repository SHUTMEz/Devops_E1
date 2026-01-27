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
              <v-icon icon="mdi-calculator" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 10</h1>
              <p class="text-gray-600 text-sm">onMounted() Lifecycle Hook</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Calculation</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ name }}</p>
              <p class="text-sm text-gray-500 mt-1">1 + 4 = 5</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 10</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Dynamic Calculation</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Message</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ message }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Calculated Value</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- onMounted Feature -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-hook" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">onMounted() Lifecycle Hook</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Executes code after the component is mounted to the DOM</p>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 mb-6">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Code Example:</h4>
          <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const message = ref("Hello Vue 3")
const name = ref("");

onMounted(() => {
    name.value = 1+4
})</code></pre>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">Initial State</h5>
            <p class="text-sm text-gray-600">message: "{{ message }}"</p>
            <p class="text-sm text-gray-600">name: "{{ name }}"</p>
          </div>
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">After Mount</h5>
            <p class="text-sm text-gray-600">message: "{{ message }}"</p>
            <p class="text-sm text-kawaii-charcoal font-semibold">name: {{ name }} (calculated)</p>
          </div>
          <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
            <h5 class="font-semibold text-kawaii-charcoal mb-2">Calculation</h5>
            <p class="text-sm text-gray-600">1 + 4 = {{ name }}</p>
            <p class="text-sm text-kawaii-mint font-semibold">✓ Computed successfully</p>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Lifecycle Demo -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Lifecycle Demo</h3>
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Component Lifecycle</h4>
              <div class="space-y-2">
                <div class="flex items-center justify-between bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">Setup</span>
                  <span class="text-sm font-semibold text-kawaii-charcoal">✓</span>
                </div>
                <div class="flex items-center justify-between bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">Template Render</span>
                  <span class="text-sm font-semibold text-kawaii-charcoal">✓</span>
                </div>
                <div class="flex items-center justify-between bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">onMounted</span>
                  <span class="text-sm font-semibold text-kawaii-mint">✓ Active</span>
                </div>
                <div class="flex items-center justify-between bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">Update</span>
                  <span class="text-sm text-gray-400">Pending</span>
                </div>
              </div>
            </div>
            
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Current Values</h4>
              <div class="space-y-2">
                <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">Message:</span>
                  <span class="text-sm font-semibold text-kawaii-charcoal">{{ message }}</span>
                </div>
                <div class="flex justify-between items-center bg-white rounded-kawaii-lg p-2 border border-gray-200">
                  <span class="text-sm text-gray-600">Name (1+4):</span>
                  <span class="text-sm font-semibold text-kawaii-charcoal">{{ name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- onMounted Benefits -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">onMounted() Benefits</h3>
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">When to Use</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Fetching initial data from APIs</li>
                <li>✓ Setting up event listeners</li>
                <li>✓ Initializing third-party libraries</li>
                <li>✓ Accessing DOM elements</li>
                <li>✓ Performing calculations after render</li>
              </ul>
            </div>
            
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Key Features</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Runs after component is mounted</li>
                <li>✓ DOM is available</li>
                <li>✓ Can access reactive data</li>
                <li>✓ Runs only once per component instance</li>
                <li>✓ Perfect for initialization logic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Interactive Controls</h3>
            <p class="text-sm text-gray-600">Try updating the values</p>
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
              @click="recalculate"
              class="bg-gradient-to-r from-kawaii-blue to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-blue hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-calculator-variant" size="18"></v-icon>
              <span>Recalculate</span>
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
        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Current Message</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ message }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Current Calculation</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ name }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Mount Status</h4>
            <p class="text-sm text-kawaii-mint font-semibold">Mounted ✓</p>
            <p class="text-xs text-gray-600 mt-1">Component is ready</p>
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

onMounted(() => {
    name.value = 1+4
    console.log('Component mounted and calculation completed!')
})

const updateMessage = () => {
  message.value = message.value === "Hello Vue 3" 
    ? "Updated with onMounted!" 
    : "Hello Vue 3"
}

const recalculate = () => {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  name.value = a + b
  message.value = `Random calculation: ${a} + ${b} = ${name.value}`
}

const resetValues = () => {
  message.value = "Hello Vue 3"
  name.value = 5
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