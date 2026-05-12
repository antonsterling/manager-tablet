<template>
    <div
      class="container-login min-h-screen"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${fondo})` }"
    >
        <div class="flex flex-col items-center justify-between min-h-screen gap-6 p-10">
            <img :src="logo" alt="" class="img-logo">
            <section class="flex flex-col gap-2 items-center justify-center bg-white p-6 rounded-lg shadow-md max-w-sm">
                <h1>Información Personal</h1>
                <form class="flex flex-col gap-2">
                    <UiInput type="text" label="Nombre Completo" icon="User" v-model="fullName" readOnly />
                    <UiInput type="text" label="Codigo" icon="UserKey" v-model="personalInfo.codigo" readOnly />
                    <UiInput type="text" label="Cargo" icon="Briefcase" v-model="personalInfo.cargo" readOnly />
                    <UiButton label="Continuar" color="read" size="lg" icon="Login" iconPosition="end" />
                </form>
            </section>
            <img :src="logo_emp" alt="" class="img-logo-emp">
        </div>
    </div>
</template>

<script setup>
import logo from '../assets/manager_logo.png'
import logo_emp from '../assets/hazlo_software.png'
import fondo from '../assets/fondo.jpg'

import { ref, computed } from 'vue'

const personalInfo = ref({
    nombre: 'Antonio',
    apellido: 'Sterling',
    codigo: '1234567890',
    cargo: 'Desarrollador',
})

const fullName = computed(() => {
    return `${personalInfo.value.nombre} ${personalInfo.value.apellido}`
})
</script>

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
}

.img-logo {
    width: 400px;
}

.img-logo-emp {
    width: 200px;
}
</style>