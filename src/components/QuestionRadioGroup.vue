<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string[]>();
</script>

<template>
    <div class="flex flex-col space-y-2 bg-gray-700 p-4 border border-red-500 rounded">
        <label v-for="(option, index) in options" :key="index" class="inline-flex items-center space-x-2">
            <input
                v-model="value"
                type="radio"
                :value="option"
                name="radio-group"
                class="border border-red-500 rounded-full focus:outline-none focus:ring focus:ring-red-500 accent-red-500"
            />
            <span class="text-red-500">{{ option }}</span>
        </label>
    </div>
</template>
