<script setup>
const config = useRuntimeConfig();
const periodId = ref(1);
const rows = ref([]);
const errorMsg = ref('');

const loadData = async () => {
  errorMsg.value = '';
  try {
    const base = config.public?.apiBase || 'http://localhost:7000';
    const token = process.client ? localStorage.getItem('token') : '';
    rows.value = await $fetch(`${base}/api/task5/reports/progress?period_id=${periodId.value}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch (e) {
    errorMsg.value = e?.data?.error || 'โหลด progress ไม่สำเร็จ';
  }
};
onMounted(loadData);
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>Progress Report</v-card-title>
      <v-card-text>
        <v-text-field v-model="periodId" type="number" label="Period ID" style="max-width:180px" />
        <v-btn color="primary" @click="loadData">Load</v-btn>
        <v-alert v-if="errorMsg" type="error" class="mt-3">{{ errorMsg }}</v-alert>
      </v-card-text>
      <v-data-table :items="rows" :headers="[{title:'Department',key:'department'},{title:'Submitted',key:'submitted'},{title:'Total',key:'total'},{title:'Percent',key:'percent'}]"/>
    </v-card>
  </v-container>
</template>
