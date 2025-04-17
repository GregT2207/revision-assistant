<script setup lang="ts">
    const open = defineModel<boolean>();
</script>

<template>
    <div v-if="open" class="z-50 fixed inset-0 flex justify-center items-center" @click.self="open = false">
        <div class="fixed bg-black opacity-70 w-full h-full"></div>

        <div class="z-50 bg-base-100 shadow-lg p-8 rounded">
            <div class="mb-8">
                <h2 class="font-bold text-white text-2xl">
                    <slot name="title" />
                </h2>

                <h3 class="text-lg">
                    <slot name="subtitle" />
                </h3>
            </div>

            <slot />
        </div>
    </div>
</template>
