<script setup lang="ts">
    import ExamQuestion from '@/components/ExamQuestion.vue';
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

    const saveExam = () => {
        if (exam.value) {
            let exams = JSON.parse(localStorage.getItem('exams') as string) || [];
            exams = exams.map((storedExam: Exam) => {
                if (storedExam.title === exam.value?.title) {
                    return { ...exam.value };
                }
                return storedExam;
            });

            localStorage.setItem('exams', JSON.stringify(exams));
        }
    };

    const markExam = () => {};
</script>

<template>
    <div v-if="exam" class="space-y-8 p-16">
        <div class="top-4 right-4 fixed space-x-4">
            <button class="bg-blue-500 shadow px-2 py-2 rounded w-32 text-white cursor-pointer" @click="saveExam">
                Save
            </button>
            <button class="bg-red-500 shadow px-2 py-2 rounded w-32 text-white cursor-pointer" @click="markExam">
                Mark
            </button>
        </div>

        <div>
            <h1 class="mb-2 font-bold text-4xl text-center">{{ exam.title }}</h1>
            <p class="text-gray-500 text-center">{{ exam.description }}</p>
        </div>

        <div>
            <p class="text-light-300 text-center">{{ exam.maxDuration }} minutes</p>
            <p class="text-light-300 text-center">{{ exam.questions.length }} questions</p>
            <p class="text-light-300 text-center">{{ exam.maxMarks }} marks</p>
        </div>

        <ExamQuestion v-for="question in exam.questions" v-model="question.answer" :question="question" />
    </div>

    <div v-else>
        <h1>Exam not found</h1>
        <p>The exam you are looking for does not exist.</p>
    </div>
</template>
