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
              <v-icon icon="mdi-list-box" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 12</h1>
              <p class="text-gray-600 text-sm">Object Iteration with v-for</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Data Type</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">Object</p>
              <p class="text-sm text-gray-500 mt-1">v-for iteration</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 12</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Student Database</h2>
            <p class="text-sm text-gray-600 mb-4">Object with nested student data</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Structure</h4>
                <p class="text-sm text-gray-600">Object with key-value pairs</p>
                <p class="text-sm text-kawaii-charcoal font-semibold mt-2">Key: {{ Object.keys(student)[0] }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <h4 class="font-semibold text-kawaii-charcoal mb-2">Student Count</h4>
                <p class="text-2xl font-bold text-kawaii-charcoal">{{ Object.keys(student).length }}</p>
                <p class="text-sm text-gray-600">Total students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student List Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-account-multiple" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Student List</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Iterating through object properties with v-for</p>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 mb-6">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Code Example:</h4>
          <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const student = {
    1: {id:1, name:"ex", age:"20", major:"XD"}
}

<li v-for="item in student" :key="item.id">
    {{ item.id }} - {{ item.name }} - {{ item.age }} - {{ item.major }}
</li></code></pre>
        </div>
        
        <!-- Student Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(item, key) in student" 
            :key="item.id"
            class="bg-white rounded-kawaii-lg p-4 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-3">
              <h5 class="font-semibold text-kawaii-charcoal">{{ item.name }}</h5>
              <span class="text-xs text-gray-500">Key: {{ key }}</span>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">ID:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.id }}</span>
              </div>
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">Age:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.age }}</span>
              </div>
              <div class="flex justify-between items-center bg-kawaii-cream rounded-kawaii p-2">
                <span class="text-sm text-gray-600">Major:</span>
                <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.major }}</span>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-xs text-kawaii-pink font-semibold">✓ Object Property</span>
              <span class="text-xs text-gray-500">v-for iteration</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Current Data -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Current Data</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Student Object</h4>
            <div class="space-y-2">
              <div v-for="(item, key) in student" :key="item.id" class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-kawaii-charcoal">{{ item.name }}</span>
                  <span class="text-xs text-gray-500">Key: {{ key }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <span>ID: {{ item.id }}</span>
                  <span>Age: {{ item.age }}</span>
                  <span>Major: {{ item.major }}</span>
                  <span>Type: Object</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- v-for Benefits -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">v-for with Objects</h3>
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Object Iteration</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Can iterate over object properties</li>
                <li>✓ Access both key and value</li>
                <li>✓ Works with nested objects</li>
                <li>✓ Perfect for dynamic data display</li>
                <li>✓ Reactive updates when data changes</li>
              </ul>
            </div>
            
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Syntax Options</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ v-for="value in object"</li>
                <li>✓ v-for="(value, key) in object"</li>
                <li>✓ v-for="(value, key, index) in object"</li>
                <li>✓ :key="value.id" for unique keys</li>
                <li>✓ Works with arrays and objects</li>
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
            <p class="text-sm text-gray-600">Try adding more students to the object</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="addStudent"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add Student</span>
            </button>
            <button 
              @click="clearStudents"
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Message</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ message }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Students</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ Object.keys(student).length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Data Type</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">Object</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Iteration</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">v-for</p>
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

const student = ref({
  1: {id:1, name:"ex", age:"20", major:"XD"}
})

console.log(student.value)

const addStudent = () => {
  const newId = Object.keys(student.value).length + 1
  student.value[newId] = {
    id: newId,
    name: `Student ${newId}`,
    age: String(20 + Math.floor(Math.random() * 10)),
    major: ["XD", "CS", "Math", "Art"][Math.floor(Math.random() * 4)]
  }
}

const clearStudents = () => {
  student.value = {
    1: {id:1, name:"ex", age:"20", major:"XD"}
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