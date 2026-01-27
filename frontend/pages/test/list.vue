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
              <v-icon icon="mdi-book-multiple" size="32" class="text-white"></v-icon>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-kawaii-charcoal mb-2">Book Management</h1>
              <p class="text-gray-600 text-sm">Interactive Data Table with CRUD Operations</p>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="text-right bg-kawaii-cream rounded-kawaii-lg p-4 border border-kawaii-pink-light">
              <p class="text-sm text-gray-600">Total Books</p>
              <p class="text-lg font-semibold text-kawaii-charcoal">{{ books.length }}</p>
              <p class="text-sm text-gray-500 mt-1">Manage your collection</p>
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
            <h2 class="text-xl font-semibold text-kawaii-charcoal mb-2">Book Collection</h2>
            <p class="text-sm text-gray-600">Interactive table with add, edit, and delete functionality</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add Book</span>
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

        <!-- Book Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="book in books" 
            :key="book.id"
            class="bg-white rounded-kawaii-xl p-6 border border-gray-200 hover:border-kawaii-pink-light hover:shadow-kawaii-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="font-bold text-kawaii-charcoal text-lg mb-1">{{ book.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">by {{ book.author }}</p>
                <div class="flex items-center space-x-2 mb-3">
                  <span class="bg-kawaii-cream text-kawaii-charcoal text-xs px-2 py-1 rounded-full font-semibold">{{ book.genre }}</span>
                  <span class="text-xs text-gray-500">•</span>
                  <span class="text-xs text-gray-500">{{ book.year }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">{{ book.pages }} pages</span>
                  <div class="flex items-center space-x-2">
                    <button 
                      @click="edit(book.id)"
                      class="text-kawaii-blue hover:text-kawaii-pink transition-colors"
                    >
                      <v-icon icon="mdi-pencil" size="18"></v-icon>
                    </button>
                    <button 
                      @click="remove(book.id)"
                      class="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <v-icon icon="mdi-delete" size="18"></v-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div class="w-16 h-20 bg-gradient-to-br from-kawaii-pink to-kawaii-lavender rounded-lg flex items-center justify-center shadow-lg">
                <v-icon icon="mdi-book" size="24" class="text-white"></v-icon>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="books.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-kawaii-cream rounded-full mx-auto mb-4 flex items-center justify-center">
            <v-icon icon="mdi-book-off" size="48" class="text-gray-400"></v-icon>
          </div>
          <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">No Books Yet</h3>
          <p class="text-gray-600 mb-6">Add your first book to get started!</p>
          <button 
            @click="add"
            class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl"
          >
            Add Your First Book
          </button>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Books</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ books.length }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-pink-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-book-multiple" size="24" class="text-kawaii-pink"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Fiction Books</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getGenreCount('Fiction') }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-lavender-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-book-open-page-variant" size="24" class="text-kawaii-lavender"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Average Pages</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getAveragePages }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-blue-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-format-list-numbered" size="24" class="text-kawaii-blue"></v-icon>
            </div>
          </div>
        </div>

        <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Oldest Book</p>
              <p class="text-2xl font-bold text-kawaii-charcoal">{{ getOldestBook }}</p>
            </div>
            <div class="w-12 h-12 bg-kawaii-mint-light rounded-full flex items-center justify-center">
              <v-icon icon="mdi-calendar" size="24" class="text-kawaii-mint"></v-icon>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Controls -->
      <div class="bg-white/90 backdrop-blur-lg rounded-kawaii-xl shadow-kawaii-xl border border-kawaii-pink-light p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-kawaii-charcoal mb-2">Quick Actions</h3>
            <p class="text-sm text-gray-600">Manage your book collection</p>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="add"
              class="bg-gradient-to-r from-kawaii-pink to-kawaii-lavender text-white font-semibold px-6 py-3 rounded-kawaii-lg hover:from-kawaii-pink hover:to-kawaii-lavender transform hover:scale-105 transition-all duration-300 shadow-kawaii-xl flex items-center space-x-2"
            >
              <v-icon icon="mdi-plus" size="18"></v-icon>
              <span>Add Book</span>
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
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Total Books</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ books.length }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Fiction</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getGenreCount('Fiction') }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Sci-Fi</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getGenreCount('Sci-Fi') }}</p>
          </div>
          
          <div class="bg-kawaii-cream border border-gray-200 rounded-kawaii-lg p-4">
            <h4 class="font-semibold text-kawaii-charcoal mb-2">Average Pages</h4>
            <p class="text-sm text-kawaii-charcoal font-semibold">{{ getAveragePages }}</p>
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
              <v-icon icon="mdi-book-edit" size="24"></v-icon>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Book' : 'Add New Book' }}</h3>
              <p class="text-sm opacity-90">{{ isEditing ? 'Update your favorite book' : 'Add your favorite book' }}</p>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pt-6">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formModel.title"
                label="Book Title"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-book"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="formModel.author"
                label="Author"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="formModel.genre"
                :items="['Fiction', 'Dystopian', 'Non-Fiction', 'Sci-Fi']"
                label="Genre"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-tag"
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formModel.year"
                type="number"
                :max="currentYear"
                :min="1"
                label="Publication Year"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formModel.pages"
                type="number"
                :min="1"
                label="Pages"
                variant="outlined"
                color="kawaii-pink"
                density="comfortable"
                prepend-inner-icon="mdi-format-list-numbered"
              ></v-text-field>
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

const currentYear = new Date().getFullYear()

function createNewRecord() {
  return {
    title: '',
    author: '',
    genre: '',
    year: currentYear,
    pages: 1,
  }
}

const books = ref([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

onMounted(() => {
  reset()
})

// Computed properties for statistics
const getAveragePages = computed(() => {
  if (books.value.length === 0) return 0
  const total = books.value.reduce((sum, book) => sum + book.pages, 0)
  return Math.round(total / books.value.length)
})

const getOldestBook = computed(() => {
  if (books.value.length === 0) return 'N/A'
  const oldest = books.value.reduce((prev, current) => {
    return prev.year < current.year ? prev : current
  })
  return oldest.year
})

const getGenreCount = (genre) => {
  return books.value.filter(book => book.genre === genre).length
}

function add() {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id) {
  const found = books.value.find(book => book.id === id)
  formModel.value = {
    id: found.id,
    title: found.title,
    author: found.author,
    genre: found.genre,
    year: found.year,
    pages: found.pages,
  }
  dialog.value = true
}

function remove(id) {
  const index = books.value.findIndex(book => book.id === id)
  books.value.splice(index, 1)
}

function save() {
  if (isEditing.value) {
    const index = books.value.findIndex(book => book.id === formModel.value.id)
    books.value[index] = formModel.value
  } else {
    formModel.value.id = books.value.length + 1
    books.value.push(formModel.value)
  }
  dialog.value = false
}

function reset() {
  dialog.value = false
  formModel.value = createNewRecord()
  books.value = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960, pages: 281 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949, pages: 328 },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', year: 1925, pages: 180 },
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'Non-Fiction', year: 2011, pages: 443 },
    { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', year: 1965, pages: 412 },
  ]
}

function clearAll() {
  books.value = []
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