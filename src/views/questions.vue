<script setup lang="ts">
    import AppQuestion from '@/components/AppQuestion.vue';
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

            for (const storedExam of storedExams) {
                if (storedExam.title === decodeURI(route.params.title.toString())) {
                    exam.value = storedExam;
                    break;
                }
            }
        } catch (error: unknown) {
            console.error('Failed to parse exam from local storage', error);
            return;
        }
    };
</script>

<template>
    <div v-if="exam" class="space-y-8 p-16">
        <AppQuestion v-for="question in exam.questions" :question="question" />
    </div>

    <div v-else>
        <h1>Exam not found</h1>
        <p>The exam you are looking for does not exist.</p>
    </div>
</template>
