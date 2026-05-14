<script setup>
import UiHeader from '../components/UiHeader.vue'
import { useRouter } from 'vue-router'
import { getSessionUser, clearSessionUser } from '../utils/authSession.js'

const router = useRouter()

const logout = () => {
    clearSessionUser()
    router.replace({ name: 'login' })
}

function onContinue() {
  if (!getSessionUser()) {
    clearSessionUser()
    router.replace({ name: 'login' })
    return
  }
}
</script>

<template>
  <div class="container-principal">
    <UiHeader />

    <div class="container-content">
      <div class="principal-outlet">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" @logout="logout" @continue="onContinue" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.principal-outlet {
  flex: 1;
  min-width: 0;
  width: 100%;
}

.container-content {
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
  padding: 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  width: 97%;
  margin: 0 auto;
}

@media (min-width: 900px) {
  .container-content {
    flex-direction: row;
    gap: 20px;
    align-items: start;
    max-width: 100%;
  }
}


</style>
