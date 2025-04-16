<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string[]>();
</script>

<template>
    <div class="flex flex-col space-y-2 bg-gray-700 p-4 border border-blue-500 rounded">
        <label v-for="option in options" :key="option" class="inline-flex items-center space-x-2">
            <input
                v-model="value"
                type="checkbox"
                :value="option"
                class="border border-blue-500 rounded focus:outline-none focus:ring focus:ring-blue-500 accent-blue-500"
            />
            <span class="text-blue-500">{{ option }}</span>
        </label>
    </div>
</template>
