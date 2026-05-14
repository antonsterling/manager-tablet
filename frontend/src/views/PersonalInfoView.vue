
<script setup>
import logo from '../assets/manager_logo.png'
import logo_emp from '../assets/hazlo_software.png'
import fondo from '../assets/fondo.jpg'
import UiInput from '../components/UiInput.vue'
import UiButton from '../components/UiButton.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionUser, clearSessionUser } from '../utils/authSession.js'

const router = useRouter()

const personalInfo = ref({
    nombrePersona: '',
    codigoPersona: '',
    cargoPersona: '',
})

// Función para cerrar sesión: limpiar almacenamiento y redirigir al login
const logout = () => {
    clearSessionUser()
    router.replace({ name: 'login' })
}


// Al montar, leer el usuario almacenado en sessionStorage.
onMounted(() => {
    const user = getSessionUser()
    if (!user) {
        router.replace({ name: 'login' })
        return
    }
    personalInfo.value.nombrePersona = user.nombrePersona || ''
    personalInfo.value.codigoPersona = user.codigoPersona || ''
    personalInfo.value.cargoPersona = user.cargoPersona || ''
})

const goToPrincipal = () => {
    if (!getSessionUser()) {
        clearSessionUser()
        router.replace({ name: 'login' })
        return
    }
    router.replace({ name: 'principal' })
}
</script>

<template>
    <div
      class="container-login min-h-screen"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${fondo})` }"
    >
        <div class="flex flex-col items-center justify-between min-h-screen gap-6 p-10">
            <img :src="logo" alt="" class="img-logo">
            <section class="flex flex-col gap-2 items-center justify-center bg-white p-6 rounded-lg shadow-md max-w-sm section-info">
                <h1>Información Personal</h1>
                <form class="flex flex-col gap-2">
                    <UiInput type="text" label="Nombre Completo" icon="User" v-model="personalInfo.nombrePersona" readOnly />
                    <UiInput type="text" label="Codigo" icon="UserKey" v-model="personalInfo.codigoPersona" readOnly />
                    <UiInput type="text" label="Cargo" icon="Briefcase" v-model="personalInfo.cargoPersona" readOnly />
                    <div class="flex gap-2 w-full justify-between items-center mt-2">
                        <UiButton label="Cerrar sesión" color="delete" size="lg" icon="Logout"  @click="logout" />
                        <UiButton label="Continuar" color="read" size="lg" icon="Login" iconPosition="end"  @click="goToPrincipal" />
                    </div>
                </form>
            </section>
            <img :src="logo_emp" alt="" class="img-logo-emp">
        </div>
    </div>
</template>


<style scoped>
*{
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

.section-info{
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