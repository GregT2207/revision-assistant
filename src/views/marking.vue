<script setup lang="ts">
    import ExamDetails from '@/components/ExamDetails.vue';
    import ExamNotFound from '@/components/ExamNotFound.vue';
    import Exam, { Markable } from '@/types/Exam';
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

    const getPercentage = (item: Markable): number => {
        return Math.round(((item.marksAwarded ?? 0) / item.maxMarks) * 100);
    };

    const getPercentageColor = (item: Markable): string => {
        const percentage = getPercentage(item);

        if (percentage >= 80) return 'success';
        if (percentage >= 50) return 'warning';

        return 'error';
    };
</script>

<template>
    <div v-if="exam" class="p-16">
        <div class="flex flex-col gap-4 mb-16">
            <ExamDetails :exam="exam" />

            <div class="flex space-x-4 w=full">
                <div class="flex flex-col justify-center items-center bg-base-100 p-8 rounded-lg w-full">
                    <p>{{ exam.markingComments }}</p>
                </div>

                <div class="flex flex-col justify-center items-center bg-base-100 p-8 rounded-lg w-full">
                    <p
                        class="mb-4 text-3xl"
                        :class="{
                            'text-success': getPercentageColor(exam) === 'success',
                            'text-warning': getPercentageColor(exam) === 'warning',
                            'text-error': getPercentageColor(exam) === 'error',
                        }"
                    >
                        {{ exam.marksAwarded }} / {{ exam.maxMarks }}
                    </p>
                    <div
                        class="border-4 border-transparent radial-progress"
                        :class="{
                            'bg-success/10 text-success': getPercentageColor(exam) === 'success',
                            'bg-warning/10 text-warning': getPercentageColor(exam) === 'warning',
                            'bg-error/10 text-error': getPercentageColor(exam) === 'error',
                        }"
                        :style="`--value:${getPercentage(exam)}; --size:12rem`"
                        role="progressbar"
                    >
                        {{ getPercentage(exam) }}%
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <div
                v-for="question in exam.questions"
                class="bg-base-100 shadow-md p-8 rounded-lg"
                :class="
                    question.marksAwarded !== undefined
                        ? {
                              'bg-success/10': question.marksAwarded === question.maxMarks,
                              'bg-warning/10': question.marksAwarded > 0 && question.marksAwarded < question.maxMarks,
                              'bg-error/10': question.marksAwarded === 0,
                          }
                        : ''
                "
            >
                <p><b>Question:</b> <span v-html="question.text"></span></p>

                <p v-if="question.options"><b>Options:</b> {{ question.options.join(', ') }}</p>

                <p>
                    <b>Your answer:</b> <span class="italic">{{ question.answer }}</span>
                </p>

                <p v-if="question.correctAnswer"><b>Correct answer:</b> {{ question.correctAnswer }}</p>

                <p><b>Marks:</b> {{ question.marksAwarded ?? 0 }} / {{ question.maxMarks }}</p>

                <p v-if="question.markingComments">
                    <b>Comments:</b> <span class="italic">{{ question.markingComments }}</span>
                </p>
            </div>
        </div>
    </div>

    <ExamNotFound v-else class="mt-16" />
</template>
