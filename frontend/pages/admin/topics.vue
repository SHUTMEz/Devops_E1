<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const rows = ref([]);
const loading = ref(false);
const dialog = ref(false);
const editId = ref(null);
const q = ref('');
const form = reactive({ code: '', title_th: '', weight: 1, active: 1 });
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Code', key: 'code' },
  { title: 'Title', key: 'title_th' },
  { title: 'Weight', key: 'weight' },
  { title: 'Active', key: 'active' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const token = () => (process.client ? localStorage.getItem('token') : '');
const api = 'http://localhost:7000/api/admin/topics';

const load = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get(api, { headers: { Authorization: `Bearer ${token()}` } });
    rows.value = data;
  } finally { loading.value = false; }
};

const reset = () => { form.code=''; form.title_th=''; form.weight=1; form.active=1; editId.value=null; };
const openCreate = () => { reset(); dialog.value = true; };
const openEdit = (row) => { Object.assign(form, { code: row.code, title_th: row.title_th, weight: row.weight, active: row.active }); editId.value=row.id; dialog.value=true; };

const save = async () => {
  const cfg = { headers: { Authorization: `Bearer ${token()}` } };
  if (editId.value) await axios.put(`${api}/${editId.value}`, form, cfg);
  else await axios.post(api, form, cfg);
  dialog.value = false;
  await load();
};

const removeRow = async (id) => {
  if (!confirm('ลบหัวข้อ?')) return;
  await axios.delete(`${api}/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
  await load();
};

onMounted(load);
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <div class="rounded-3xl p-6 bg-gradient-to-r from-fuchsia-700 via-purple-700 to-cyan-700 shadow-2xl">
        <h1 class="text-3xl font-black tracking-wide">⚡ TOPIC CONTROL CENTER</h1>
        <p class="opacity-80">จัดการหัวข้อประเมินแบบเต็ม CRUD</p>
      </div>

      <v-card class="rounded-3xl">
        <v-card-text class="flex gap-3 items-center">
          <v-text-field v-model="q" label="Search" density="comfortable" hide-details />
          <v-btn color="deep-purple" @click="openCreate">+ New Topic</v-btn>
          <v-btn variant="tonal" @click="load">Refresh</v-btn>
        </v-card-text>
        <v-data-table :loading="loading" :headers="headers" :items="rows.filter(r=>`${r.code} ${r.title_th}`.toLowerCase().includes(q.toLowerCase()))">
          <template #item.active="{ item }">
            <v-chip :color="item.active ? 'success' : 'error'">{{ item.active ? 'active' : 'inactive' }}</v-chip>
          </template>
          <template #item.actions="{ item }">
            <v-btn size="small" color="primary" class="mr-2" @click="openEdit(item)">Edit</v-btn>
            <v-btn size="small" color="error" @click="removeRow(item.id)">Delete</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title>{{ editId ? 'Edit Topic' : 'Create Topic' }}</v-card-title>
        <v-card-text class="grid grid-cols-2 gap-4">
          <v-text-field v-model="form.code" label="Code" />
          <v-text-field v-model="form.title_th" label="Title" />
          <v-text-field v-model="form.weight" label="Weight" type="number" />
          <v-select v-model="form.active" label="Active" :items="[{title:'Yes',value:1},{title:'No',value:0}]" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog=false">Cancel</v-btn>
          <v-btn color="primary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
