<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        options: string[];
    }>();

    const selected = ref('');
</script>

<template>
    <select
        v-model="selected"
        class="bg-gray-700 px-3 py-2 border border-orange-500 focus:border-orange-500 rounded focus:outline-none focus:ring text-light-100"
    >
        <option disabled value="">Select an option</option>
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>
