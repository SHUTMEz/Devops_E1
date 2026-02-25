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
    const data = await $fetch(`${base}/api/task3/reports/normalized?period_id=${periodId.value}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    rows.value = data.per_topic || [];
  } catch (e) {
    errorMsg.value = e?.data?.error || 'โหลดรายงานไม่สำเร็จ';
  }
};

onMounted(loadData);
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Normalized 60 Report</v-card-title>
      <v-card-text>
        <v-text-field v-model="periodId" type="number" label="Period ID" style="max-width: 180px" />
        <v-btn color="primary" @click="loadData">Load</v-btn>
        <v-alert v-if="errorMsg" type="error" class="mt-3">{{ errorMsg }}</v-alert>
      </v-card-text>
      <v-data-table :items="rows" :headers="[{title:'Evaluatee',key:'evaluatee_id'},{title:'Topic',key:'topic_code'},{title:'Score',key:'topic_score'}]" />
    </v-card>
  </v-container>
</template>
