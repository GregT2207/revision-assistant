<script setup lang="ts">
const open = defineModel<boolean>()
</script>

<template>
  <!-- Modal Wrapper -->
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @click.self="open = false"
  >
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <!-- Modal Content -->
    <div
      class="relative z-10 w-full max-w-lg mx-auto bg-base-100 rounded-lg shadow-xl p-6"
    >
      <!-- Title -->
      <div class="mb-4">
        <h2 class="text-2xl font-semibold text-base-content">
          <slot name="title" />
        </h2>
        <p class="text-sm text-muted">
          <slot name="subtitle" />
        </p>
      </div>

      <!-- Default Slot Content -->
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
