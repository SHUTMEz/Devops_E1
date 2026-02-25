<script setup>
defineProps({
  title: String,
  desc: String,
  to: String,
  icon: { type: String, default: 'mdi-arrow-right' },
  accent: { type: String, default: 'from-cyan-500/30 to-blue-500/30' },
});
</script>

<template>
  <NuxtLink :to="to" class="block">
    <div class="rounded-2xl border border-white/10 bg-gradient-to-r p-4 text-white hover:scale-[1.01] transition" :class="accent">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-wider opacity-80">Quick Action</p>
          <h3 class="text-lg font-bold">{{ title }}</h3>
          <p class="text-sm opacity-90">{{ desc }}</p>
        </div>
        <v-icon :icon="icon" size="24" />
      </div>
    </div>
  </NuxtLink>
</template>
