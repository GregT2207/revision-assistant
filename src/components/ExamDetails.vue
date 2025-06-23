<script setup lang="ts">
    import Exam from '@/types/Exam';

    const props = defineProps<{ exam: Exam }>();
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <!-- Exam Info Box -->
        <div class="flex flex-col justify-center items-center bg-base-100 p-6 md:p-8 rounded-lg w-full shadow">
            <h1 class="mb-2 font-bold text-2xl text-center">{{ exam.title }}</h1>
            <p v-html="exam.description" class="text-gray-500 text-center text-base"></p>
        </div>

        <!-- Stats Box -->
        <div class="flex flex-col justify-center items-center gap-4 bg-base-100 p-6 md:p-8 rounded-lg w-full shadow">
            <p class="text-2xl font-semibold text-center">
                {{ exam.maxDuration }} <span class="text-sm font-normal">minutes</span>
            </p>
            <p class="text-2xl font-semibold text-center">
                {{ exam.questions.length }} <span class="text-sm font-normal">questions</span>
            </p>
            <p class="text-2xl font-semibold text-center">
                {{ exam.maxMarks }} <span class="text-sm font-normal">marks</span>
            </p>
        </div>
    </div>
</template>
