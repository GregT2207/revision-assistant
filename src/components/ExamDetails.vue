<script setup lang="ts">
    import Exam from '@/types/Exam';

    const props = defineProps<{ exam: Exam }>();
</script>

<template>
    <div class="flex space-x-4">
        <div class="flex flex-col justify-center items-center bg-base-100 p-8 rounded-lg w-full">
            <h1 class="mb-2 font-bold text-2xl text-center">{{ exam.title }}</h1>
            <p v-html="exam.description" class="text-gray-500 text-center"></p>
        </div>

        <div class="flex flex-col justify-center items-center space-y-4 bg-base-100 p-8 rounded-lg w-full">
            <p class="text-4xl text-center">{{ exam.maxDuration }} minutes</p>
            <p class="text-4xl text-center">{{ exam.questions.length }} questions</p>
            <p class="text-4xl text-center">{{ exam.maxMarks }} marks</p>
        </div>
    </div>
</template>
