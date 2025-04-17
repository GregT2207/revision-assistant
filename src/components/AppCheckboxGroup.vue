<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string[]>();
</script>

<template>
    <div class="w-full">
        <ul
            class="border border-base-content/25 rounded-md *:first:rounded-t-md *:last:rounded-b-md divide-y divide-base-content/25 max-w-sm *:cursor-pointer"
        >
            <li v-for="option in options" :key="option">
                <label class="flex items-center gap-3 p-3">
                    <input v-model="value" type="checkbox" class="checkbox checkbox-primary" />
                    <span class="text-base label-text">{{ option }}</span>
                </label>
            </li>
        </ul>
    </div>
</template>
