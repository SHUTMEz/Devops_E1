<script setup>
definePageMeta({ middleware: [] });
const router = useRouter();
onMounted(() => {
  router.replace('/home');
});
</script>

<template>
  <v-container class="py-8">
    <v-alert type="info">Redirecting to /home ...</v-alert>
  </v-container>
</template>
