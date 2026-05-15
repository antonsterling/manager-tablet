<template>
  <div style="padding:20px">
    <UiCard v-for="item in list" :key="item.ID_MAQUINA" :content="{
      nameTask: item.NOMBRE_MAQUINA,
      subtitleTask: item.NOMBRE_PROCESO,
      descriptionTask: item.NOMBRE_ETAPA,
    }"/>
  </div>
</template>

<script setup>

import axios from '../../api/axios.js'
import { ref, onMounted } from 'vue'
const list = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('otmCorrectiva/list-machines')
    list.value = Array.isArray(response.data) ? response.data : []
    console.log(list.value)
  } catch (e) {
    console.error('Error al obtener la lista de máquinas', e)
  }
})
</script>

<style scoped>
h2 { margin-bottom: 8px }
</style>

