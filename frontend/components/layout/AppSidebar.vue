<script setup>
import { computed } from 'vue';
const props = defineProps({
  role: { type: String, default: '' },
  userName: { type: String, default: 'Guest' },
  userEmail: { type: String, default: '' },
  sections: { type: Array, default: () => [] },
});

const emit = defineEmits(['logout']);

const roleBadge = computed(() => {
  const map = {
    admin: { label: 'Admin Control', color: 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30' },
    evaluator: { label: 'Evaluator Desk', color: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30' },
    evaluatee: { label: 'My Portfolio', color: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' },
  };
  return map[props.role] || { label: 'Guest', color: 'bg-slate-500/20 text-slate-200 border-slate-400/30' };
});

const initials = computed(() => (props.userName || 'G').trim().charAt(0).toUpperCase());
</script>

<template>
  <aside class="h-full w-full text-white bg-slate-950/95 border-r border-white/10 flex flex-col">
    <div class="px-5 py-6 border-b border-white/10">
      <p class="text-xs tracking-[0.25em] text-cyan-300">VEC SYSTEM</p>
      <h2 class="text-2xl font-black">EVAL HUB</h2>
      <div class="mt-4 flex items-center gap-3">
        <div class="h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center font-black text-slate-900">
          {{ initials }}
        </div>
        <div class="min-w-0">
          <p class="font-semibold truncate">{{ userName }}</p>
          <p class="text-xs text-slate-300 truncate">{{ userEmail || '-' }}</p>
        </div>
      </div>
      <div class="mt-3 inline-flex items-center rounded-full border px-3 py-1 text-xs" :class="roleBadge.color">
        {{ roleBadge.label }}
      </div>
    </div>

    <div class="flex-1 overflow-y-auto px-3 py-4 space-y-4">
      <section v-for="section in sections" :key="section.label">
        <p class="px-3 text-[11px] uppercase tracking-widest text-slate-400 mb-2">{{ section.label }}</p>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in section.items"
            :key="item.to"
            :to="item.to"
            class="group flex items-center gap-3 rounded-xl px-3 py-2 text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-100 transition"
            active-class="bg-cyan-500/20 text-cyan-100"
          >
            <v-icon :icon="item.icon" size="18" />
            <span class="text-sm">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </section>
    </div>

    <div class="p-3 border-t border-white/10">
      <button
        class="w-full rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 py-2 text-sm font-medium"
        @click="emit('logout')"
      >
        Logout
      </button>
    </div>
  </aside>
</template>
