<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const rows = ref([]), topics = ref([]), dialog = ref(false), loading = ref(false), editId = ref(null);
const form = reactive({ topic_id: null, code: '', name_th: '', type: 'score_1_4', weight: 1, min_score: 1, max_score: 4, active: 1, description: '' });
const headers = [
  { title: 'ID', key: 'id' }, { title: 'Code', key: 'code' }, { title: 'Name', key: 'name_th' },
  { title: 'Type', key: 'type' }, { title: 'Weight', key: 'weight' }, { title: 'Topic', key: 'topic_title' }, { title: 'Actions', key: 'actions' }
];
const token = () => (process.client ? localStorage.getItem('token') : '');
const api = 'http://localhost:7000/api/admin/indicators';

const load = async () => {
  loading.value = true;
  const cfg = { headers: { Authorization: `Bearer ${token()}` } };
  const [a, b] = await Promise.all([
    axios.get(api, cfg),
    axios.get('http://localhost:7000/api/admin/topics', cfg),
  ]);
  rows.value = a.data; topics.value = b.data;
  loading.value = false;
};

const openCreate = () => { editId.value=null; Object.assign(form,{topic_id:null,code:'',name_th:'',type:'score_1_4',weight:1,min_score:1,max_score:4,active:1,description:''}); dialog.value=true; };
const openEdit = (i) => { editId.value=i.id; Object.assign(form, i); dialog.value=true; };
const save = async () => {
  const cfg = { headers: { Authorization: `Bearer ${token()}` } };
  if (editId.value) await axios.put(`${api}/${editId.value}`, form, cfg); else await axios.post(api, form, cfg);
  dialog.value=false; await load();
};
const del = async (id) => { if (!confirm('Delete indicator?')) return; await axios.delete(`${api}/${id}`, { headers: { Authorization: `Bearer ${token()}` } }); await load(); };

onMounted(load);
</script>

<template>
  <div class="min-h-screen bg-black p-8 text-lime-300 font-mono">
    <h1 class="text-4xl mb-4">[INDICATOR MATRIX]</h1>
    <v-card>
      <v-card-text>
        <v-btn color="success" @click="openCreate">CREATE</v-btn>
        <v-btn class="ml-2" @click="load">RELOAD</v-btn>
      </v-card-text>
      <v-data-table :headers="headers" :items="rows" :loading="loading">
        <template #item.type="{ item }"><v-chip>{{ item.type }}</v-chip></template>
        <template #item.actions="{ item }">
          <v-btn size="small" color="primary" @click="openEdit(item)">EDIT</v-btn>
          <v-btn size="small" color="error" class="ml-2" @click="del(item.id)">DEL</v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-card-title>{{ editId ? 'EDIT' : 'CREATE' }} INDICATOR</v-card-title>
        <v-card-text class="grid grid-cols-2 gap-4">
          <v-select v-model="form.topic_id" label="Topic" :items="topics.map(t=>({title:`${t.code} - ${t.title_th}`,value:t.id}))" />
          <v-text-field v-model="form.code" label="Code" />
          <v-text-field v-model="form.name_th" label="Name" />
          <v-select v-model="form.type" label="Type" :items="['score_1_4','yes_no']" />
          <v-text-field v-model="form.weight" label="Weight" type="number" />
          <v-text-field v-model="form.min_score" label="Min" type="number" />
          <v-text-field v-model="form.max_score" label="Max" type="number" />
          <v-select v-model="form.active" label="Active" :items="[{title:'Yes',value:1},{title:'No',value:0}]" />
          <v-textarea v-model="form.description" label="Description" class="col-span-2" />
        </v-card-text>
        <v-card-actions><v-spacer/><v-btn @click="dialog=false">CANCEL</v-btn><v-btn color="primary" @click="save">SAVE</v-btn></v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
