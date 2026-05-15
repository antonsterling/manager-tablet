<template>
    <div class="ui-card">
        <div class="text-title" :class="[colorCard]">
            {{ nameText.charAt(0).toUpperCase() }}
        </div>
        <div class="content">
            <h3>{{ content.idTask }} - {{ content.nameTask }}</h3>
            <p>{{ content.descriptionTask }}</p>
            <span>Fecha: {{ formatDate(content.dateProgrammed) }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    nameText: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
})

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const colorCard = computed(() => {
    const today = new Date()
    const dateProgrammed = new Date(props.content.dateProgrammed)
    if (dateProgrammed.toDateString() === today.toDateString()) {
        return 'bg-yellow-500'
    } else if (dateProgrammed < today) {
        return 'bg-red-700'
    } else {
        return 'bg-green-700'
    }
})
</script>

<style scoped>
.ui-card {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-bottom: 16px;
    cursor: pointer;
    box-shadow: 0 0 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.7);
}

.ui-card:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

.ui-card:active {
    transform: scale(0.98);
    transition: transform 0.3s ease;
}

.text-title {
    width: fit-content;
    min-width: 100px;
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
}

.content {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content h3 {
    font-size: 1.2rem;
    font-weight: bold;
}

.content p {
    font-size: 1rem;
    font-weight: normal;
}

.content span {
    font-size: 0.8rem;
    font-weight: 600;
    text-align: right;
}
</style>