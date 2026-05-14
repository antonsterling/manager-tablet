<script setup>
import logo from '../assets/manager_logo.png'
import logo_emp from '../assets/hazlo_software.png'
import fondo from '../assets/fondo.jpg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SESSION_USER_KEY } from '../utils/authSession.js'
import UiInput from '../components/UiInput.vue'
import UiButton from '../components/UiButton.vue'
import UiAlert from '../components/UiAlert.vue'

const router = useRouter()

const codigoPersonal = ref('')
const alertVisible = ref(false)
const alertMessage = ref('')
const alertType = ref('error')

// Al cargar la vista, obtener y mostrar todos los usuarios en consola
onMounted(async () => {
  try {
    const res = await fetch('/api/users')
    if (!res.ok) {
      console.error('Error al obtener usuarios:', res.statusText)
      return
    }
    const users = await res.json()
    // Mostrar en consola todos los usuarios
    // eslint-disable-next-line no-console
    console.log('Usuarios:', users)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error al conectarse al backend:', err)
  }
})

async function onSubmit() {
  alertVisible.value = false
  const id = String(codigoPersonal.value || '').trim()

  try {
    const res = await fetch(`/api/users/${encodeURIComponent(id)}`)
    if (res.status === 404) {
      alertMessage.value = 'Usuario no encontrado'
      alertType.value = 'error'
      alertVisible.value = true
      return
    }
    if (!res.ok) {
      alertMessage.value = `Error del servidor: ${res.statusText}`
      alertType.value = 'error'
      alertVisible.value = true
      return
    }
    const user = await res.json()
    // Guardar en sessionStorage para que PersonalInfoView lo lea
    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user))
    router.push({ name: 'personal-info' })
  } catch (err) {
    alertMessage.value = 'Error de conexión con el servidor'
    alertType.value = 'error'
    alertVisible.value = true
    // eslint-disable-next-line no-console
    console.error('Login error', err)
  }
}
</script>


<template>
  <div class="container-login min-h-screen"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${fondo})` }">
    <div class="flex flex-col items-center justify-between min-h-screen gap-4 p-10">
      <img :src="logo" alt="" class="img-logo">
      <section
        class="section-info flex flex-col gap-4 items-center justify-center bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h1>Iniciar sesión</h1>
        <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
          <UiAlert v-if="alertVisible" :type="alertType" :message="alertMessage" @close="alertVisible = false" />
          <UiInput v-model="codigoPersonal" type="text" label="ID Usuario" icon="Number" />
          <UiButton @click="onSubmit" label="Iniciar sesión" color="read" size="lg" icon="Login" iconPosition="end" />
        </form>
      </section>
      <img :src="logo_emp" alt="" class="img-logo-emp">
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container-login {
  background-color: rgba(0, 0, 0, 0.5);
  min-height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-surface);
}

.img-logo {
  width: 90%;
}

.img-logo-emp {
  width: 70%;
}

.section-info {
  background-color: rgba(190, 190, 190, 0.5);
}

@media (min-width: 900px) {
  .img-logo {
    width: 50%;
  }

  .img-logo-emp {
    width: 30%;
  }
}
</style>