<script setup lang="ts">
    import Exam from '@/types/Exam';

    const props = defineProps<{ exam: Exam }>();
</script>

<template>
    <div class="space-y-4">
        <div>
            <h1 class="mb-2 font-bold text-4xl text-center">{{ exam.title }}</h1>
            <p class="text-gray-500 text-center">{{ exam.description }}</p>
        </div>

        <div>
            <p class="text-light-300 text-center">{{ exam.maxDuration }} minutes</p>
            <p class="text-light-300 text-center">{{ exam.questions.length }} questions</p>
            <p class="text-light-300 text-center">{{ exam.maxMarks }} marks</p>
        </div>
    </div>
</template>
