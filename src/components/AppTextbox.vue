<script setup lang="ts">
    const props = defineProps<{
        placeholder?: string;
        rows?: number;
    }>();

    const value = defineModel<string>();
</script>

<template>
    <textarea
        v-model="value"
        :rows="rows ?? 5"
        :placeholder="placeholder ?? 'Enter text...'"
        class="w-full !min-h-0 textarea"
        aria-label="Textarea"
    ></textarea>
</template>
