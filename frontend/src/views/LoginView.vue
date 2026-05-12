<template>
    <div
      class="container-login min-h-screen"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${fondo})` }"
    >
        <div class="flex flex-col items-center justify-between min-h-screen gap-4 p-10">
            <img :src="logo" alt="" class="img-logo">
            <section class="flex flex-col gap-4 items-center justify-center bg-white p-6 rounded-lg shadow-md max-w-sm">
                <h1>Iniciar sesión</h1>
                <form class="flex flex-col gap-4">
                    <UiInput type="text" label="Codigo Personal" icon="User" />
                    <UiButton label="Iniciar sesión" color="read" size="lg" icon="Login" iconPosition="end" />
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