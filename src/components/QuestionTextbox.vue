<script setup lang="ts">
    const props = defineProps<{
        placeholder?: string;
        rows?: number;
    }>();

    const value = defineModel<string>();
</script>

<template>
    <div>
        <textarea
            v-model="value"
            :rows="rows ?? 5"
            :placeholder="placeholder ?? 'Enter text...'"
            class="bg-gray-700 px-3 py-2 border border-green-500 focus:border-green-500 rounded focus:outline-none w-full text-light-100 placeholder-green-500"
        ></textarea>
    </div>
</template>
