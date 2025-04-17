<script setup lang="ts">
    import AppTextbox from '@/components/AppTextbox.vue';
    import ExamDetails from '@/components/ExamDetails.vue';
    import ExamNotFound from '@/components/ExamNotFound.vue';
    import ExamQuestion from '@/components/ExamQuestion.vue';
    import examMarker from '@/services/ExamMarker';
    import Exam from '@/types/Exam';
    import debounce from 'lodash/debounce';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();
    const exam = ref<Exam | null>(null);
    const uploadedMarkScheme = ref<File | null>(null);
    const markGuidelines = ref<string>('');
    const showMarkExamModal = ref(false);
    const marking = ref(false);

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
        if (!exam.value) {
            console.error('No exam to save');
            return;
        }

        let exams = JSON.parse(localStorage.getItem('exams') as string) || [];
        exams = exams.map((storedExam: Exam) => {
            if (storedExam.title === exam.value!.title) {
                return { ...exam.value };
            }
            return storedExam;
        });

        localStorage.setItem('exams', JSON.stringify(exams));
    };

    const debouncedSaveExam = debounce(saveExam, 1000);

    const markExam = async () => {
        if (!exam.value) {
            console.error('No exam to mark');
            return;
        }

        marking.value = true;
        saveExam();
        exam.value = await examMarker.markExamAnswers(exam.value, uploadedMarkScheme.value, markGuidelines.value);
        saveExam();

        router.push({
            name: 'marking',
            params: {
                title: exam.value?.title,
            },
        });
    };
</script>

<template>
    <form v-if="exam" class="space-y-8 p-16">
        <div class="top-4 right-4 fixed space-x-4">
            <button
                type="button"
                class="bg-blue-500 shadow px-2 py-2 rounded w-32 text-white cursor-pointer"
                @click="saveExam"
            >
                Save
            </button>
            <button
                type="button"
                class="bg-red-500 shadow px-2 py-2 rounded w-32 text-white cursor-pointer"
                @click="showMarkExamModal = !showMarkExamModal"
            >
                Mark
            </button>
        </div>

        <ExamDetails :exam="exam" />
        <ExamQuestion
            v-for="question in exam.questions"
            v-model="question.answer"
            :question="question"
            @change="debouncedSaveExam"
        />

        <!-- mark exam modal -->
        <div
            v-if="showMarkExamModal"
            class="z-50 fixed inset-0 flex justify-center items-center"
            @click.self="showMarkExamModal = false"
        >
            <div class="fixed bg-black opacity-70 w-full h-full"></div>

            <div class="z-50 space-y-4 bg-gray-500 shadow-lg p-8 rounded">
                <div>
                    <h2 class="mb-2 text-2xl">Mark Exam</h2>
                    <p>
                        Are you ready to complete this exam and have it marked? If so, upload the mark scheme and/or any
                        marking guidelines you have.
                    </p>
                </div>

                <div class="space-y-2">
                    <input
                        type="file"
                        class="bg-gray-700 px-3 py-2 border border-red-500 focus:border-red-500 rounded focus:outline-none w-full text-light-100 placeholder-green-500"
                        accept=".pdf"
                        placeholder="Upload PDF"
                        @change="(e: Event) => (uploadedMarkScheme = (e.target as HTMLInputElement).files?.[0] || null)"
                    />

                    <AppTextbox v-model="markGuidelines" :placeholder="'Marking guidelines...'" :rows="5" />
                </div>

                <div class="flex justify-end space-x-2 mt-4">
                    <button
                        type="button"
                        class="bg-red-500 px-4 py-2 rounded w-full text-white cursor-pointer"
                        @click="showMarkExamModal = false"
                    >
                        I'm not finished, go back
                    </button>
                    <button
                        type="button"
                        class="bg-green-500 px-4 py-2 rounded w-full text-white cursor-pointer"
                        :class="marking ? 'opacity-50 cursor-not-allowed' : ''"
                        :disabled="marking"
                        @click="markExam"
                    >
                        My answers are final, mark my exam
                    </button>
                </div>
            </div>
        </div>
    </form>

    <ExamNotFound v-else class="mt-16" />
</template>
