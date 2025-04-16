<script setup lang="ts">
    import Exam from '@/types/Exam';
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const exam = ref<Exam | null>(null);

    onMounted(() => {
        getExam();
    });

    const getExam = () => {
        let storedExams: Exam[];
        try {
            storedExams = JSON.parse(localStorage.getItem('exams') as string);
            if (!storedExams) {
                throw new Error('No exams found in local storage');
            }

            exam.value = storedExams.find((storedExam: Exam) => storedExam.title === route.params.title) ?? null;
        } catch (error: unknown) {
            console.error('Failed to parse exam from local storage', error);
            return;
        }
    };
</script>

<template>
    {{ exam }}
</template>
