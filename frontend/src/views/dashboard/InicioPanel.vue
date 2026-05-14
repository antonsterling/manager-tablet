<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Pie, Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import UiButton from '@/components/UiButton.vue'

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
)

const buildQuery = (params) => new URLSearchParams(params).toString()

const dataGrafic1 = ref([])
const dataGrafic2 = ref([])

onMounted(async () => {
  try {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = firstDay.toISOString().split('T')[0]
    const endDate = lastDay.toISOString().split('T')[0]

    // Try cache first
    const cacheKey1 = 'grafics-general-month'
    const cacheKey2 = 'grafics-execution-index'
    const cached1 = sessionStorage.getItem(cacheKey1)
    const cached2 = sessionStorage.getItem(cacheKey2)
    if (cached1) dataGrafic1.value = JSON.parse(cached1)
    if (cached2) dataGrafic2.value = JSON.parse(cached2)

    const requests = []
    if (!cached1) requests.push(fetch(`/api/grafics/general-month?${buildQuery({ startDate, endDate })}`))
    if (!cached2) requests.push(fetch(`/api/grafics/execution-index?${buildQuery({ ano: year })}`))
    if (requests.length) {
      const responses = await Promise.all(requests)
      let idx = 0
      if (!cached1) {
        const res1 = responses[idx++]
        if (!res1.ok) { console.error('Error general-month', res1.statusText); return }
        const d1 = await res1.json()
        dataGrafic1.value = d1
        sessionStorage.setItem(cacheKey1, JSON.stringify(d1))
      }
      if (!cached2) {
        const res2 = responses[idx++]
        if (!res2.ok) { console.error('Error execution-index', res2.statusText); return }
        const d2 = await res2.json()
        dataGrafic2.value = d2
        sessionStorage.setItem(cacheKey2, JSON.stringify(d2))
      }
    }
  } catch (err) {
    console.error(err)
  }
})

onUnmounted(() => {
  dataGrafic1.value = []
  dataGrafic2.value = []
})

const grouped = computed(() => {
  const rows = dataGrafic1.value || []
  if (!rows.length) return []
  if (rows[0].label !== undefined && rows[0].count !== undefined) {
    return rows.map(r => [r.label, Number(r.count)])
  }
  const map = new Map()
  for (const row of rows) {
    const tipo = row.TIPO_MANTENIMIENTO ?? row.tipo_mantenimiento ?? ''
    const clase = row.CLASE_ACTIVIDAD ?? row.clase_actividad ?? ''
    const key = `${tipo} - ${clase}`.trim()
    const count = Number(row.COUNT ?? row.count ?? 0)
    map.set(key, (map.get(key) || 0) + count)
  }
  return Array.from(map.entries())
})

const palette = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#f97316', '#06b6d4', '#8b5cf6']

const chartData = computed(() => {
  const labels = grouped.value.map((g) => g[0])
  const data = grouped.value.map((g) => g[1])
  const backgroundColor = labels.map((_, i) => palette[i % palette.length])
  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  }
})

const chartOptions = {
  animation: { duration: 0 },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12 } },
    title: { display: true, text: 'Participación de actividades de mantenimiento' },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || ''
          const value = context.parsed || 0
          return `${label}: ${value}`
        }
      }
    }
  }
}

const barData = computed(() => {
  const rows = dataGrafic2.value || []
  const labels = rows.map(r => r.NOMBRE_MES ?? r.nombre_mes ?? '')
  const programada = rows.map(r => Number(r.NRO_PROGRAMADA ?? r.nro_programada ?? 0))
  const pendiente = rows.map(r => Number(r.NRO_PENDIENTE ?? r.nro_pendiente ?? 0))
  const cumplida = rows.map(r => Number(r.NRO_CUMPLIDA ?? r.nro_cumplida ?? 0))
  const indice = rows.map(r => Number(r.VLR_INDICE ?? r.vlr_indice ?? 0))
  return {
    labels,
    datasets: [
      { label: 'NRO_PROGRAMADA', data: programada, backgroundColor: '#10b981', type: 'bar' },
      { label: 'NRO_PENDIENTE', data: pendiente, backgroundColor: '#2563eb', type: 'bar' },
      { label: 'NRO_CUMPLIDA', data: cumplida, backgroundColor: '#a16207', type: 'bar' },
      { label: 'VLR_INDICE', data: indice, borderColor: '#8b5cf6', backgroundColor: '#8b5cf6', type: 'line', yAxisID: 'y1', fill: false, tension: 0.3, pointRadius: 3 }
    ]
  }
})

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: { mode: 'index', intersect: false },
    title: { display: true, text: 'Ejecución y Representamiento de OTMs' }
  },
  scales: {
    x: { stacked: false },
    y: { type: 'linear', position: 'left', title: { display: true, text: 'Cantidad' } },
    y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Índice' } }
  }
}
</script>

<template>
  <div class="container-principal">
    <div class="container-content">
      <div class="container-grafics">
        <div style="min-height:360px; display:flex; align-items:center; justify-content:center;">
          <div style="width:100%; max-width:640px; height:360px; margin:0 auto;">
            <Pie :data="chartData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <div class="container-grafics">
        <div style="min-height:360px; display:flex; align-items:center; justify-content:center;">
          <div style="width:100%; max-width:640px; height:360px; margin:0 auto;">
            <Bar :data="barData" :options="barOptions" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mb-4">
      <UiButton label="Cerrar sesión" color="delete" size="lg" icon="Logout" @click="$emit('logout')"
        style="margin-top:12px;" iconPosition="end" />
    </div>
  </div>
</template>

<style scoped>
.container-content {
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  gap: 20px;
  width: 100%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02)
}

.container-grafics {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(15, 23, 42, 0.04);
  min-height: 360px;
  width: 100%
}

.container-buttons {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  padding: 12px 32px
}

@media (max-width: 900px) {
  .container-content {
    flex-direction: column;
    gap: 22px;
    max-width: 90%;
    margin: 16px auto;
    padding: 4px;
  }

}
</style>
