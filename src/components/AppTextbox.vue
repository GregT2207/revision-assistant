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
        class="w-full textarea textarea-bordered resize-y min-h-[4rem] focus:outline-none focus:ring-2 focus:ring-primary transition duration-150"
        aria-label="Textarea"
    ></textarea>
</template>
