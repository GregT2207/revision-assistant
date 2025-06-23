<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const isDarkMode = ref(false)
const isMenuOpen = ref(false)

function setTheme(dark: boolean) {
  isDarkMode.value = dark
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'soft')
  localStorage.setItem('theme', dark ? 'dark' : 'soft')
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const shouldUseDark = stored === 'dark' || (!stored && prefersDark)
  setTheme(shouldUseDark)
})
</script>

<template>
  <header class="w-full bg-[var(--color-header)] text-base-content shadow-md z-50 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <a href="/" class="text-xl font-semibold tracking-tight">Revision Assistant</a>

      <div class="flex items-center gap-2">
        <div
          :class="[
            'flex items-center gap-1 p-1 rounded-full transition-colors',
            isDarkMode ? 'bg-slate-600' : 'bg-slate-200'
          ]"
        >
          <button
            class="p-2 rounded-full"
            :class="{
              'bg-white text-blue-600 shadow': !isDarkMode,
              'text-gray-400': isDarkMode
            }"
            @click="setTheme(false)"
            aria-label="Light Mode"
          >
            <Icon icon="tabler:sun" class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            class="p-2 rounded-full"
            :class="{
              'bg-zinc-700 text-yellow-400 shadow': isDarkMode,
              'text-gray-400': !isDarkMode
            }"
            @click="setTheme(true)"
            aria-label="Dark Mode"
          >
            <Icon icon="tabler:moon" class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div class="md:hidden">
          <button
            class="p-2 rounded hover:bg-blue-100 transition"
            @click="toggleMenu"
            aria-label="Toggle menu"
          >
            <Icon
              :icon="isMenuOpen ? 'tabler:x' : 'tabler:menu-2'"
              class="w-6 h-6 text-base-content"
            />
          </button>
        </div>
      </div>
    </div>

    <div v-show="isMenuOpen" class="md:hidden px-4 pb-4 space-y-2 transition-all">
      <p class="text-sm text-base-content/70">Menu coming soon...</p>
    </div>
  </header>
</template>
