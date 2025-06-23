<script setup lang="ts">
const props = defineProps<{
  options: string[];
}>();

const value = defineModel<string[]>();
</script>

<template>
  <div class="w-full max-w-sm">
    <ul
      class="rounded-md border border-base-300 divide-y divide-base-300 bg-base-100 shadow-sm overflow-hidden"
    >
      <li
        v-for="option in options"
        :key="option"
        class="hover:bg-base-200 transition-colors"
      >
        <label class="flex items-center gap-3 px-4 py-3 cursor-pointer">
          <input
            v-model="value"
            type="checkbox"
            :value="option"
            class="form-checkbox h-5 w-5 text-primary accent-primary transition focus:ring focus:ring-primary/50"
          />
          <span class="text-base text-base-content">{{ option }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
