<template>
  <div>
    <div class="flex flex-col container-header">
      <img :src="logo" alt="" class="img-logo">
      <div class="flex justify-between pr-4 pl-4 pb-2 flex-wrap gap-2">
        <UiButton
          :class="['btn-header', { 'is-selected': selected === 'inicio' }]"
          label="Inicio"
          outlined
          color="info"
          size="lg"
          icon="Home"
          @click="onClick('inicio', 'principal-inicio')"
        />
        <UiButton
          :class="['btn-header', { 'is-selected': selected === 'rutas' }]"
          label="Ejecución Rutas"
          outlined
          color="info"
          size="lg"
          icon="Route"
          @click="onClick('rutas', 'principal-rutas')"
        />
        <UiButton
          :class="['btn-header', { 'is-selected': selected === 'programadas' }]"
          label="OTM Programadas"
          outlined
          color="info"
          size="lg"
          icon="CalendarPlus"
          @click="onClick('programadas', 'principal-programadas')"
        />
        <UiButton
          :class="['btn-header', { 'is-selected': selected === 'correctivas' }]"
          label="OTM Correctivas"
          outlined
          color="info"
          size="lg"
          icon="CalendarX2"
          @click="onClick('correctivas', 'principal-correctivas')"
        />
      </div>
    </div>

    <!-- Spacer para que el contenido de la página no quede oculto por el header fijo -->
    <div class="header-spacer" aria-hidden="true"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logo from '../assets/manager_logo.png'
import { getSessionUser } from '../utils/authSession.js'

const emit = defineEmits(['select-route'])
const route = useRoute()
const router = useRouter()

const selectedByRouteName = {
  'principal-inicio': 'inicio',
  'principal-rutas': 'rutas',
  'principal-programadas': 'programadas',
  'principal-correctivas': 'correctivas'
}

const selected = computed(() => selectedByRouteName[route.name] ?? '')

function onClick(name, routeName) {
  emit('select-route', { name, routeName })
  if (!getSessionUser()) {
    router.replace({ name: 'login' }).catch(() => {})
    return
  }
  router.push({ name: routeName }).catch(() => {})
}
</script>

<style scoped>
.container-header {
  width: 90%;
  position: fixed;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  border-radius: 10px;
  gap: 2px;
}

/* Centrar el contenido interno y limitar ancho para pantallas grandes */
.container-header header,
.container-header>div {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.img-logo {
  height: 40px;
  object-fit: contain;
  display: flex;
  justify-content: center;
}


/* Espacio que evita que el contenido quede oculto por el header fijo */
.header-spacer {
  height: 125px;
  width: 100%;
}

/* Ajustes responsive: en pantallas de tablet / móvil reducir botones y letra, aumentar spacer */
@media (max-width: 1024px) {
  /* Reducir tamaño de las imágenes del header para dejar más espacio */
  .img-logo,
  .img-logo-emp {
    height: 36px;
  }

  /* Selector que afecte a los UiButton que reciben la clase btn-header */
  .btn-header {
    /* Reducir fuente y padding para botones grandes */
    font-size: 0.9rem;
    padding: 6px 10px;
  }

  /* Si el botón usa la estructura interna .ui-btn__label, ajustarla también */
  .btn-header .ui-btn__label {
    font-size: 0.9rem;
  }
}

/* Pantallas más pequeñas (teléfonos): aún más compacto y aumentar spacer */
@media (max-width: 600px) {
  .img-logo {
    height: 26px;
    margin-top: 10px;
  }

  .btn-header {
    font-size: 0.85rem;
    padding: 6px 8px;
    border-radius: 6px;
  }

  .btn-header .ui-btn__label {
    font-size: 0.85rem;
  }

  /* Forzar tamaño de iconos internos más pequeño (si aplica) */
  .btn-header .ui-btn__icon {
    width: 16px;
    height: 16px;
  }

  /* Aumentar el spacer para que el contenido no quede oculto por el header */
  .header-spacer {
    height: 160px;
  }
}
/* Móvil: ocupar todo el ancho, apilar botones, quitar borde redondeado y suavizar blur/sombra */
@media (max-width: 600px) {
  .container-header {
    width: 100%;
    left: 0;
    transform: none;
    top: 0;
    border-radius: 0;
    padding-bottom: 8px;
  }

  /* Hacer que el contenido interno no esté limitado a max-width en móvil */
  .container-header header,
  .container-header>div {
    max-width: none;
    margin: 0;
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Apilar los botones en columna y que ocupen todo el ancho */
  .container-header > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }

  .btn-header {
    width: 100%;
    display: block;
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Aumentar el spacer para mayor separación con el contenido */
  .header-spacer {
    height: 190px;
  }
}
/* Mejoras visuales para escritorio: logos más grandes, botones alineados y mayor contraste */
@media (min-width: 1025px) {
  .container-header {
    width: 85%;
    top: 12px;
    padding: 2px 18px;
  }

  .container-header header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
  }

  .img-logo, .img-logo-emp {
    height: 42px;
  }

  /* Botones en línea centrados y con mayor separación */
  .container-header > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    padding: 8px 12px;
  }

  .btn-header {
    padding: 10px 16px;
    font-size: 0.95rem;
    border-radius: 8px;
  }
  .btn-header .ui-btn__label { font-size: 0.95rem; }
}
/* Estado seleccionado visual para botones del header */
.btn-header.is-selected {
  /* usar la variable --btn-color que define cada UiButton para dar color consistente */
  background-color: var(--btn-color) !important;
  color: #ffffff !important;
  border-color: transparent !important;
  box-shadow: 0 6px 18px rgba(15,23,42,0.12);
  transform: translateY(-1px);
}
.btn-header.is-selected .ui-btn__icon {
  color: #ffffff;
}
.btn-header.is-selected .ui-btn__label {
  color: #ffffff;
  font-weight: 600;
}
</style>