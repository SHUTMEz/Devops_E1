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
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Exam 11</h1>
              <p class="text-gray-600 text-sm">Object Reference with ref()</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Selected Student</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ name.name }}</p>
              <p class="text-sm text-gray-500 mt-1">ID: {{ name.id }}</p>
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
          <h1 class="text-4xl font-bold text-kawaii-charcoal mb-4">Exam 11</h1>
          <p class="text-lg text-gray-600 mb-6">{{ message }}</p>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-6">
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Student Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Name</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ name.name }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Age</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ name.age }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-4 border border-gray-200">
                <p class="text-sm text-gray-600 mb-2">Major</p>
                <p class="text-lg font-semibold text-kawaii-charcoal">{{ name.major }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Student Data Section -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-kawaii-blue to-kawaii-lavender rounded-full mx-auto mb-4 text-white shadow-lg">
          <v-icon icon="mdi-account-group" size="32"></v-icon>
        </div>
        <h3 class="text-xl font-semibold text-kawaii-charcoal mb-4 text-center">Student Database</h3>
        <p class="text-sm text-gray-600 text-center mb-6">Array of student objects with ref() binding</p>
        
        <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 mb-6">
          <h4 class="font-semibold text-kawaii-charcoal mb-2">Code Example:</h4>
          <pre class="text-sm text-kawaii-charcoal overflow-auto"><code>const student = [
    {id:1, name:"Alice", age:23, major:"Mathematics"},
    {id:2, name:"Bob", age:23, major:"Mathematics"},
    {id:3, name:"Charlie", age:19, major:"Mathematics"}
]

name.value = student[2] // Selects Charlie</code></pre>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="student in students" 
            :key="student.id"
            :class="[
              'bg-white rounded-kawaii-lg p-4 border transition-all duration-300 cursor-pointer',
              selectedStudent === student.id 
                ? 'border-kawaii-pink-light bg-kawaii-pink-light/50' 
                : 'border-gray-200 hover:border-kawaii-pink-light hover:bg-kawaii-pink-light/20'
            ]"
            @click="selectStudent(student)"
          >
            <div class="flex items-center justify-between mb-2">
              <h5 class="font-semibold text-kawaii-charcoal">{{ student.name }}</h5>
              <span class="text-xs text-gray-500">ID: {{ student.id }}</span>
            </div>
            <div class="space-y-1">
              <p class="text-sm text-gray-600">Age: {{ student.age }}</p>
              <p class="text-sm text-gray-600">Major: {{ student.major }}</p>
            </div>
            <div v-if="selectedStudent === student.id" class="mt-2">
              <span class="text-xs text-kawaii-pink font-semibold">✓ Selected</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Current Selection -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Current Selection</h3>
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <div class="grid grid-cols-1 gap-3">
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Message:</span>
                <p class="font-semibold text-kawaii-charcoal mt-1">{{ message }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Selected Name:</span>
                <p class="font-semibold text-kawaii-charcoal mt-1">{{ name.name }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Age:</span>
                <p class="font-semibold text-kawaii-charcoal mt-1">{{ name.age }}</p>
              </div>
              <div class="bg-white rounded-kawaii-lg p-3 border border-gray-200">
                <span class="text-sm text-gray-600">Major:</span>
                <p class="font-semibold text-kawaii-charcoal mt-1">{{ name.major }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- ref() Benefits -->
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">ref() with Objects</h3>
          <div class="space-y-4">
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Object References</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Can store complex objects in ref()</li>
                <li>✓ Reactive updates when object changes</li>
                <li>✓ Deep reactivity for nested properties</li>
                <li>✓ Perfect for form data and API responses</li>
                <li>✓ Type-safe with TypeScript</li>
              </ul>
            </div>
            
            <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Key Features</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>✓ Automatic unwrapping in templates</li>
                <li>✓ .value needed in JavaScript</li>
                <li>✓ Works with arrays and objects</li>
                <li>✓ Reactive throughout component</li>
                <li>✓ Can be destructured with toRefs()</li>
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
            <p class="text-sm text-gray-600">Try selecting different students</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="randomSelect"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-dice-multiple" size="18"></v-icon>
              <span>Random Select</span>
            </button>
            <button 
              @click="resetSelection"
              class="bg-gray-500 text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-undo" size="18"></v-icon>
              <span>Reset</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Name</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ name.name }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Age</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ name.age }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Major</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ name.major }}</p>
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

const students = [
    {id:1, name:"Alice", age:23, major:"Mathematics"},
    {id:2, name:"Bob", age:23, major:"Mathematics"},
    {id:3, name:"Charlie", age:19, major:"Mathematics"}
]

// Select Charlie by default
name.value = students[2]
console.log(students)

const selectedStudent = ref(3) // Charlie's ID

const selectStudent = (student) => {
  name.value = student
  selectedStudent.value = student.id
}

const randomSelect = () => {
  const randomIndex = Math.floor(Math.random() * students.length)
  selectStudent(students[randomIndex])
}

const resetSelection = () => {
  name.value = students[2] // Reset to Charlie
  selectedStudent.value = 3
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