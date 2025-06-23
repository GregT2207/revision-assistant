<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  options: string[]
}>()

const value = defineModel<string>()
const open = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function select(option: string) {
  value.value = option
  open.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative w-full">
    <!-- Toggle Button -->
    <button
      type="button"
      class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-base-100 text-base-content hover:bg-base-200 transition"
      @click="open = !open"
      aria-haspopup="listbox"
      :aria-expanded="open"
    >
      <span>{{ value || 'Select an option' }}</span>
      <Icon
        icon="tabler:chevron-down"
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      />
    </button>

    <!-- Dropdown Menu -->
    <ul
      v-if="open"
      class="absolute z-50 mt-1 w-full rounded-md shadow bg-base-100 border border-gray-300 divide-y divide-base-200"
      role="listbox"
    >
      <!-- Slot Content -->
      <li class="px-4 py-2 text-sm text-muted pointer-events-none bg-[var(--color-accent)]" role="none">
        <slot />
      </li>

      <!-- Options -->
      <li
        v-for="option in options"
        :key="option"
        @click="select(option)"
        class="px-4 py-2 text-sm hover:bg-secondary cursor-pointer"
        role="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
