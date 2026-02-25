<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { useMenu } from '~/composables/useMenu';

const router = useRouter();
const authStore = useAuthStore();
const drawer = ref(false);

onMounted(() => {
  authStore.hydrateFromStorage();
});

const role = computed(() => authStore.user?.role || '');
const { menu } = useMenu(role);
const userName = computed(() => authStore.user?.name_th || 'Guest');
const userEmail = computed(() => authStore.user?.email || '');

const pageTitle = computed(() => {
  const path = router.currentRoute.value.path;
  if (path.startsWith('/admin')) return 'Admin Workspace';
  if (path.startsWith('/evaluator')) return 'Evaluator Workspace';
  if (path.startsWith('/me')) return 'Personal Workspace';
  if (path.startsWith('/reports')) return 'Reporting Center';
  return 'Dashboard';
});

const pageSubtitle = computed(() => router.currentRoute.value.path);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-slate-950">
    <div class="flex min-h-screen">
      <div class="hidden md:block w-80 shrink-0">
        <AppSidebar
          :role="role"
          :user-name="userName"
          :user-email="userEmail"
          :sections="menu"
          @logout="logout"
        />
      </div>

      <v-navigation-drawer v-model="drawer" temporary location="left" width="320" class="md:hidden">
        <AppSidebar
          :role="role"
          :user-name="userName"
          :user-email="userEmail"
          :sections="menu"
          @logout="logout"
        />
      </v-navigation-drawer>

      <div class="flex-1 min-w-0">
        <AppTopbar :title="pageTitle" :subtitle="pageSubtitle" @toggle-mobile-sidebar="drawer = true" />
        <main class="p-4 md:p-8">
          <div class="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl min-h-[calc(100vh-130px)] p-4 md:p-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
