<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string>();
</script>

<template>
    <div class="inline-flex relative w-full dropdown">
        <button
            id="dropdown-header"
            type="button"
            class="w-full dropdown-toggle btn btn-primary btn-soft"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
        >
            {{ value || 'Select an option' }}
            <span class="size-4 dropdown-open:rotate-180 icon-[tabler--chevron-down]"></span>
        </button>
        <ul
            class="hidden dropdown-open:opacity-100 min-w-60 dropdown-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-header"
        >
            <li class="gap-2 dropdown-header">
                <slot />
            </li>
            <li v-for="option in options" :key="option" @click="value = option">
                <a class="dropdown-item" href="#">{{ option }}</a>
            </li>
        </ul>
    </div>
</template>
