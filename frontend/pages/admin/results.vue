<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const rows = ref([]), loading = ref(false), dialog = ref(false), editId = ref(null);
const form = reactive({ period_id: 1, evaluatee_id: null, evaluator_id: null, topic_id: null, indicator_id: null, score: null, value_yes_no: null, notes: '', status: 'draft' });
const headers = [
  { title: 'ID', key: 'id' }, { title: 'Evaluatee', key: 'evaluatee_name' }, { title: 'Evaluator', key: 'evaluator_name' },
  { title: 'Indicator', key: 'indicator_name' }, { title: 'Score', key: 'score' }, { title: 'Yes/No', key: 'value_yes_no' },
  { title: 'Status', key: 'status' }, { title: 'Actions', key: 'actions' }
];
const token = () => (process.client ? localStorage.getItem('token') : '');
const api = 'http://localhost:7000/api/admin/results';

const load = async () => {
  loading.value = true;
  const { data } = await axios.get(api, { headers: { Authorization: `Bearer ${token()}` } });
  rows.value = data;
  loading.value = false;
};
const openCreate = () => { editId.value=null; Object.assign(form,{ period_id: 1, evaluatee_id:null,evaluator_id:null,topic_id:null,indicator_id:null,score:null,value_yes_no:null,notes:'',status:'draft' }); dialog.value=true; };
const openEdit = (r) => { editId.value=r.id; Object.assign(form, r); dialog.value=true; };
const save = async () => {
  const cfg = { headers: { Authorization: `Bearer ${token()}` } };
  if (editId.value) await axios.put(`${api}/${editId.value}`, form, cfg); else await axios.post(api, form, cfg);
  dialog.value=false; await load();
};
const del = async (id) => { if (!confirm('Delete result?')) return; await axios.delete(`${api}/${id}`, { headers: { Authorization: `Bearer ${token()}` } }); await load(); };

onMounted(load);
</script>

<template>
  <div class="min-h-screen p-8" style="background: radial-gradient(circle at top left,#001b3a,#151515,#340027);">
    <div class="max-w-7xl mx-auto">
      <div class="backdrop-blur-xl rounded-3xl border border-white/20 p-6 mb-6 text-white">
        <h1 class="text-4xl font-extrabold">RESULTS OPS BOARD</h1>
        <p class="opacity-80">จัดการผลประเมินแบบ CRUD เต็มรูปแบบ</p>
      </div>
      <v-card>
        <v-card-text><v-btn color="primary" @click="openCreate">New Result</v-btn> <v-btn class="ml-2" @click="load">Refresh</v-btn></v-card-text>
        <v-data-table :headers="headers" :items="rows" :loading="loading">
          <template #item.status="{ item }"><v-chip :color="item.status==='locked'?'error':item.status==='submitted'?'success':'warning'">{{ item.status }}</v-chip></template>
          <template #item.actions="{ item }"><v-btn size="small" @click="openEdit(item)">Edit</v-btn><v-btn size="small" color="error" class="ml-2" @click="del(item.id)">Delete</v-btn></template>
        </v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>{{ editId ? 'Edit Result' : 'Create Result' }}</v-card-title>
        <v-card-text class="grid grid-cols-2 gap-4">
          <v-text-field v-model="form.period_id" label="Period ID" type="number" />
          <v-text-field v-model="form.evaluatee_id" label="Evaluatee ID" type="number" />
          <v-text-field v-model="form.evaluator_id" label="Evaluator ID" type="number" />
          <v-text-field v-model="form.topic_id" label="Topic ID" type="number" />
          <v-text-field v-model="form.indicator_id" label="Indicator ID" type="number" />
          <v-text-field v-model="form.score" label="Score" type="number" />
          <v-text-field v-model="form.value_yes_no" label="Yes/No (0/1)" type="number" />
          <v-select v-model="form.status" :items="['draft','submitted','locked']" label="Status" />
          <v-textarea v-model="form.notes" label="Notes" class="col-span-2" />
        </v-card-text>
        <v-card-actions><v-spacer/><v-btn @click="dialog=false">Cancel</v-btn><v-btn color="primary" @click="save">Save</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
