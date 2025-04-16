<script setup lang="ts">
    import { ref } from 'vue';

    const props = defineProps<{
        options: string[];
    }>();

    const value = ref<string[]>([]);
</script>

<template>
    <div class="flex flex-col space-y-2 bg-gray-700 p-4 border border-blue-500 rounded">
        <label v-for="option in options" :key="option" class="inline-flex items-center space-x-2">
            <input
                type="checkbox"
                :value="option"
                v-model="value"
                class="border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-500 accent-blue-500"
            />
            <span class="text-blue-500">{{ option }}</span>
        </label>
    </div>
</template>
