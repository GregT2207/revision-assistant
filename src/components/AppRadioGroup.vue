<script setup lang="ts">
    const props = defineProps<{
        options: string[];
    }>();

    const value = defineModel<string>();
</script>

<template>
    <div class="w-full max-w-sm">
        <ul class="border border-base-content/25 rounded-md overflow-hidden divide-y divide-base-content/20">
            <li v-for="option in options" :key="option" class="hover:bg-base-200 transition-colors">
                <label class="flex items-center gap-3 px-4 py-3 cursor-pointer">
                    <input
                        v-model="value"
                        :value="option"
                        type="radio"
                        class="radio radio-primary"
                        :aria-checked="value === option"
                        :aria-label="option"
                    />
                    <span class="text-base text-base-content">
                        {{ option }}
                    </span>
                </label>
            </li>
        </ul>
    </div>
</template>
