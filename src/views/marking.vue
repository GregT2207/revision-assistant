<script setup lang="ts">
    import ExamDetails from '@/components/ExamDetails.vue';
    import ExamNotFound from '@/components/ExamNotFound.vue';
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
    <div v-if="exam" class="space-y-8 p-16">
        <ExamDetails :exam="exam" />
        <p>{{ exam.marksAwarded }} / {{ exam.maxMarks }}</p>
        <p>{{ Math.round(((exam.marksAwarded ?? 0) / exam.maxMarks) * 100) }}%</p>

        <div v-for="question in exam.questions" class="space-y-4">
            {{ question }}
        </div>
    </div>

    <ExamNotFound v-else class="mt-16" />
</template>
