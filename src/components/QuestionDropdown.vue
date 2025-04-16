<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string>();
</script>

<template>
    <select
        v-model="value"
        class="bg-gray-700 px-3 py-2 border border-orange-500 focus:border-orange-500 rounded focus:outline-none focus:ring text-light-100"
    >
        <option disabled :value="null">Select an option</option>
        <option v-for="option in options" :key="option" :value="option">
            {{ option }}
        </option>
    </select>
</template>
