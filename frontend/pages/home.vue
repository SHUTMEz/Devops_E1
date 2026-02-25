<script setup>
import { computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const role = computed(() => auth.user?.role || 'guest');

const profile = computed(() => ({
  name: auth.user?.name_th || 'Guest User',
  email: auth.user?.email || '-',
  role: role.value,
}));

const stats = computed(() => {
  if (role.value === 'admin') {
    return [
      { label: 'Users', value: '120', color: 'text-fuchsia-300' },
      { label: 'Topics', value: '4', color: 'text-cyan-300' },
      { label: 'Indicators', value: '20', color: 'text-emerald-300' },
      { label: 'Assignments', value: '78', color: 'text-amber-300' },
    ];
  }
  if (role.value === 'evaluator') {
    return [
      { label: 'My Assignments', value: '12', color: 'text-cyan-300' },
      { label: 'Submitted', value: '9', color: 'text-emerald-300' },
      { label: 'Draft', value: '3', color: 'text-amber-300' },
      { label: 'Locked', value: '5', color: 'text-fuchsia-300' },
    ];
  }
  return [
    { label: 'My Evidence', value: '15', color: 'text-cyan-300' },
    { label: 'Submitted', value: '6', color: 'text-emerald-300' },
    { label: 'Draft', value: '2', color: 'text-amber-300' },
    { label: 'Locked', value: '1', color: 'text-fuchsia-300' },
  ];
});

const actions = computed(() => {
  const base = [
    { title: 'Normalized Report', desc: 'สรุปคะแนนแปลงมาตรฐาน /60', to: '/reports/normalized', icon: 'mdi-table-large', accent: 'from-cyan-500/30 to-blue-600/30' },
    { title: 'Progress Report', desc: 'ติดตามความคืบหน้าตามแผนก', to: '/reports/progress', icon: 'mdi-chart-donut', accent: 'from-fuchsia-500/30 to-purple-600/30' },
    { title: 'System Health', desc: 'ตรวจสถานะระบบ backend', to: '/system/health', icon: 'mdi-heart-pulse', accent: 'from-emerald-500/30 to-teal-600/30' },
  ];
  return base;
});
</script>

<template>
  <div class="space-y-6 text-white">
    <section class="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-white/10">
      <p class="text-xs uppercase tracking-[0.25em] text-cyan-300">Welcome</p>
      <h2 class="text-3xl md:text-4xl font-black mt-2">{{ profile.name }}</h2>
      <p class="text-slate-300 mt-2">{{ profile.email }} • <span class="uppercase">{{ profile.role }}</span></p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <div v-for="item in stats" :key="item.label" class="rounded-2xl border border-white/10 bg-slate-800/70 p-5">
        <p class="text-xs text-slate-400 uppercase tracking-widest">{{ item.label }}</p>
        <p class="text-3xl font-black mt-2" :class="item.color">{{ item.value }}</p>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <QuickActionCard
        v-for="action in actions"
        :key="action.title"
        :title="action.title"
        :desc="action.desc"
        :to="action.to"
        :icon="action.icon"
        :accent="action.accent"
      />
    </section>
  </div>
</template>
