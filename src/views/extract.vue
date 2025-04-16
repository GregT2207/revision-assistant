<script setup lang="ts">
    import QuestionDropdown from '@/components/QuestionDropdown.vue';
    import examExtractor from '@/services/ExamExtractor';
    import Exam from '@/types/Exam';
    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const apiKey = ref<string>('');
    const model = ref<string>('gpt-4o');
    const uploadedExam = ref<File | null>(null);
    const loading = ref(false);

    onMounted(() => {
        if (localStorage.getItem('llm_api_key')) {
            apiKey.value = localStorage.getItem('llm_api_key') as string;
        }

        if (localStorage.getItem('llm_model')) {
            model.value = localStorage.getItem('llm_model') as string;
        } else {
            setModel();
        }
    });

    const setApiKey = () => {
        localStorage.setItem('llm_api_key', apiKey.value);
    };

    const setModel = () => {
        localStorage.setItem('llm_model', model.value);
    };

    const getExams = () => {
        let exams: Exam[];
        try {
            exams = JSON.parse(localStorage.getItem('exams') as string) || [];
        } catch (error: unknown) {
            exams = [];
        }
        return exams;
    };

    const storeNewExam = async () => {
        if (!uploadedExam.value) {
            console.error('No exam uploaded');
            return;
        }

        loading.value = true;

        const exams = getExams();

        try {
            const newExam = await examExtractor.extractExamQuestions(uploadedExam.value);
            if (!newExam) {
                throw new Error('Failed to extract questions from uploaded exam');
            }

            exams.push(newExam);
            localStorage.setItem('exams', JSON.stringify(exams));

            await router.push({
                name: 'questions',
                params: {
                    title: newExam.title,
                },
            });
            return;
        } catch (error: unknown) {
            console.error('Error storing new exam:', error);
        } finally {
            loading.value = false;
        }
    };

    watch(apiKey, () => setApiKey());
    watch(model, () => setModel());
</script>

<template>
    <div class="mx-auto p-16 container">
        <div class="gap-4 grid grid-cols-2">
            <div class="flex flex-col gap-4">
                <p>OpenAI API Key</p>
                <input
                    v-model="apiKey"
                    type="password"
                    class="bg-gray-700 px-3 py-2 border border-orange-500 focus:border-orange-500 rounded focus:outline-none w-full text-light-100 placeholder-orange-500"
                    placeholder="sk-something"
                />
            </div>

            <div class="flex flex-col gap-4">
                <p>Model</p>
                <QuestionDropdown v-model="model" :options="['gpt-4o', 'gpt-4o-mini', 'o1']" />
            </div>

            <div class="flex flex-col gap-4 col-span-2">
                <p>Exam Paper</p>
                <input
                    type="file"
                    class="bg-gray-700 px-3 py-2 border border-red-500 focus:border-red-500 rounded focus:outline-none w-full text-light-100 placeholder-green-500"
                    accept=".pdf"
                    placeholder="Upload PDF"
                    @change="(e: Event) => (uploadedExam = (e.target as HTMLInputElement).files?.[0] || null)"
                />
            </div>

            <div class="flex flex-col gap-4 col-span-2 mt-4">
                <button
                    class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-light-100 transition duration-200"
                    :class="loading ? 'opacity-50 cursor-not-allowed' : ''"
                    :disabled="loading"
                    @click="storeNewExam"
                >
                    {{ loading ? 'Extracting exam questions...' : 'Extract exam questions' }}
                </button>
            </div>

            <div class="flex flex-col gap-4 col-span-2 mt-32">
                <router-link
                    v-for="exam in getExams()"
                    :key="exam.title"
                    :to="{ name: 'questions', params: { title: exam.title } }"
                    class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-light-100 transition duration-200"
                >
                    {{ exam.title }}
                </router-link>
            </div>
        </div>
    </div>
</template>
