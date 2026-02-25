<script setup>
const props = defineProps({
  title: { type: String, default: 'Dashboard' },
  subtitle: { type: String, default: '' },
});

const emit = defineEmits(['toggle-mobile-sidebar']);
</script>

<template>
  <header class="sticky top-0 z-30 backdrop-blur-xl bg-slate-900/70 border-b border-white/10 text-white">
    <div class="px-4 md:px-8 py-4 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 min-w-0">
        <v-btn icon variant="text" class="md:hidden" @click="emit('toggle-mobile-sidebar')">
          <v-icon icon="mdi-menu" />
        </v-btn>
        <div class="min-w-0">
          <h1 class="text-lg md:text-2xl font-extrabold truncate">{{ title }}</h1>
          <p class="text-xs md:text-sm text-slate-300 truncate">{{ subtitle }}</p>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-2 text-xs text-slate-300">
        <v-icon icon="mdi-shield-check" size="16" class="text-emerald-300"/>
        <span>Secure Session</span>
      </div>
    </div>
  </header>
</template>
