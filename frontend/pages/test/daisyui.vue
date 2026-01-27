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
              <v-icon icon="mdi-palette" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">daisyUI + Kawaii Theme</h1>
              <p class="text-gray-600 text-sm">Beautiful UI Components</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Theme</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">Kawaii Modern</p>
              <p class="text-sm text-gray-500 mt-1">daisyUI + Tailwind</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4">
      <!-- Main Card -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-kawaii-charcoal mb-2">daisyUI + Nuxt3</h2>
            <p class="text-gray-600">ทำงานร่วมกับ Tailwind ได้ทันที</p>
          </div>
          <div class="flex items-center space-x-3">
            <button class="btn btn-primary bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Hello daisyUI
            </button>
          </div>
        </div>
      </div>

      <!-- Button Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Primary Buttons</h3>
          <div class="space-y-3">
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold hover:bg-kawaii-pink-light transition-colors duration-300">
              Default
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Primary
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-lavender to-kawaii-blue text-white font-semibold hover:from-kawaii-lavender hover:to-kawaii-blue transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Secondary
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-mint to-kawaii-green text-white font-semibold hover:from-kawaii-mint hover:to-kawaii-green transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Accent
            </button>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Status Buttons</h3>
          <div class="space-y-3">
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-blue to-kawaii-lavender text-white font-semibold hover:from-kawaii-blue hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Info
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-mint to-kawaii-green text-white font-semibold hover:from-kawaii-mint hover:to-kawaii-green transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Success
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-yellow to-kawaii-orange text-white font-semibold hover:from-kawaii-yellow hover:to-kawaii-orange transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Warning
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-red to-kawaii-pink text-white font-semibold hover:from-kawaii-red hover:to-kawaii-pink transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Error
            </button>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Action Buttons</h3>
          <div class="space-y-3">
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold hover:bg-kawaii-pink-light transition-colors duration-300 flex items-center justify-center space-x-2">
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add</span>
            </button>
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-blue-light text-kawaii-blue font-semibold hover:bg-kawaii-blue-light transition-colors duration-300 flex items-center justify-center space-x-2">
              <v-icon icon="mdi-edit" size="18"></v-icon>
              <span>Edit</span>
            </button>
            <button class="btn btn-outline w-full bg-red-50 border-red-200 text-red-600 font-semibold hover:bg-red-100 transition-colors duration-300 flex items-center justify-center space-x-2">
              <v-icon icon="mdi-delete" size="18"></v-icon>
              <span>Delete</span>
            </button>
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-green-light text-kawaii-green font-semibold hover:bg-kawaii-green-light transition-colors duration-300 flex items-center justify-center space-x-2">
              <v-icon icon="mdi-check" size="18"></v-icon>
              <span>Save</span>
            </button>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Size Variants</h3>
          <div class="space-y-3">
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold text-sm py-2 px-4 rounded-kawaii hover:bg-kawaii-pink-light transition-colors duration-300">
              Small Button
            </button>
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold py-3 px-6 rounded-kawaii-lg hover:bg-kawaii-pink-light transition-colors duration-300">
              Medium Button
            </button>
            <button class="btn btn-outline w-full bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold text-lg py-4 px-8 rounded-kawaii-xl hover:bg-kawaii-pink-light transition-colors duration-300">
              Large Button
            </button>
            <button class="btn btn-outline w-full bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold text-xl py-5 px-10 rounded-kawaii-2xl hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Extra Large
            </button>
          </div>
        </div>
      </div>

      <!-- Component Showcase -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Cards</h3>
          <div class="space-y-4">
            <div class="card bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4 hover:shadow-kawaii-xl transition-shadow duration-300">
              <h4 class="font-semibold text-kawaii-charcoal mb-2">Basic Card</h4>
              <p class="text-sm text-gray-600">Simple card with Kawaii styling</p>
            </div>
            <div class="card bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white rounded-kawaii-lg p-4 hover:shadow-kawaii-xl transition-shadow duration-300">
              <h4 class="font-semibold mb-2">Gradient Card</h4>
              <p class="text-sm opacity-90">Beautiful gradient background</p>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-4">Badges & Chips</h3>
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              <span class="badge bg-kawaii-pink-light text-kawaii-pink font-semibold px-3 py-1 rounded-full text-sm">New</span>
              <span class="badge bg-kawaii-blue-light text-kawaii-blue font-semibold px-3 py-1 rounded-full text-sm">Info</span>
              <span class="badge bg-kawaii-green-light text-kawaii-green font-semibold px-3 py-1 rounded-full text-sm">Success</span>
              <span class="badge bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full text-sm">Error</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <span class="chip bg-kawaii-cream border border-kawaii-pink-light text-kawaii-pink font-medium px-4 py-2 rounded-full text-sm hover:bg-kawaii-pink-light transition-colors duration-300">Tag 1</span>
              <span class="chip bg-kawaii-cream border border-kawaii-blue-light text-kawaii-blue font-medium px-4 py-2 rounded-full text-sm hover:bg-kawaii-blue-light transition-colors duration-300">Tag 2</span>
              <span class="chip bg-kawaii-cream border border-kawaii-green-light text-kawaii-green font-medium px-4 py-2 rounded-full text-sm hover:bg-kawaii-green-light transition-colors duration-300">Tag 3</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Ready to Use</h3>
            <p class="text-sm text-gray-600">All components styled with Kawaii theme</p>
          </div>
          <div class="flex items-center space-x-3">
            <button class="btn btn-outline bg-kawaii-cream border-kawaii-pink-light text-kawaii-pink font-semibold px-6 py-3 rounded-kawaii-lg hover:bg-kawaii-pink-light transition-colors duration-300">
              Learn More
            </button>
            <button class="btn btn-outline bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-8 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this demo page
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