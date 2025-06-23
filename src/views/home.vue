<script setup lang="ts">
    import AppDropdown from '@/components/AppDropdown.vue';
    import examExtractor from '@/services/ExamExtractor';
    import Exam from '@/types/Exam';
    import { base64EncodeFile } from '@/utils/file-utils';
    import { Icon } from '@iconify/vue';
    import { onMounted, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const apiKey = ref<string>('');
    const model = ref<string>('gpt-4o');
    const timeElapsed = ref<number>(0);
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
        timeElapsed.value = 0;
        const interval = setInterval(() => {
            timeElapsed.value += 1;
        }, 1000);

        try {
            const encodedFile = await base64EncodeFile(uploadedExam.value);
            localStorage.setItem(uploadedExam.value.name, encodedFile);
        } catch (error: unknown) {
            console.error('Error storing file:', error);
            loading.value = false;
            clearInterval(interval);
            return;
        }

        const exams = getExams();

        try {
            const newExam = await examExtractor.extractExamQuestions(uploadedExam.value.name);
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
            console.error('Error storing exam:', error);
        } finally {
            loading.value = false;
            clearInterval(interval);
        }
    };

    watch(apiKey, () => setApiKey());
    watch(model, () => setModel());
</script>

<template>
    <div class="space-y-16 mx-auto p-4 sm:px-8 sm:py-16 max-w-7xl container">
        <div class="card">
            <div class="card-body">
                <!-- Input Form -->
                <div class="gap-6 grid grid-cols-1 sm:grid-cols-2">
                    <div class="flex flex-col gap-2">
                        <label class="font-medium" for="api-key">Enter Your OpenAI API Key</label>
                        <input
                            id="api-key"
                            v-model="apiKey"
                            type="password"
                            class="bg-base-100 shadow-sm px-4 py-5 border border-gray-300 focus:border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full text-base-content transition input placeholder-gray-400"
                            placeholder="sk-..."
                            aria-label="OpenAI API Key"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-medium" for="model">Select AI Model</label>
                        <AppDropdown v-model="model" :options="['gpt-4o', 'gpt-4o-mini', 'o1']">
                            <small>
                                <a
                                    href="https://platform.openai.com/docs/models"
                                    target="_blank"
                                    class="underline"
                                    rel="noopener"
                                >
                                    Read more about OpenAI models here
                                </a>
                            </small>
                        </AppDropdown>
                    </div>

                    <div class="flex flex-col gap-2 sm:col-span-2">
                        <label class="font-medium" for="exam-upload">Exam Paper</label>

                        <label
                            for="exam-upload"
                            class="flex flex-col justify-center items-center gap-3 bg-base-100 hover:bg-base-200 px-3 sm:px-6 py-5 sm:py-10 border-2 border-gray-300 border-dashed rounded-md text-center transition cursor-pointer"
                        >
                            <!-- File Icon -->
                            <Icon icon="mdi:file-pdf-box" class="w-20 h-20 text-red-500" />

                            <!-- Drag & Drop Text -->
                            <p class="font-semibold text-lg">Drag and drop a file here</p>
                            <p class="text-gray-500 text-md dark:text-gray-400">PDF only, max 10MB</p>

                            <!-- Button -->
                            <div class="mt-2">
                                <span class="px-8 sm:px-16 py-4 sm:py-8 btn btn-lg btn-soft btn-primary"
                                    >Select a file</span
                                >
                            </div>
                        </label>

                        <input
                            id="exam-upload"
                            type="file"
                            class="hidden"
                            accept=".pdf"
                            @change="(e: Event) => (uploadedExam = (e.target as HTMLInputElement).files?.[0] || null)"
                            aria-label="Upload Exam File"
                        />
                    </div>

                    <div class="flex justify-center sm:col-span-2">
                        <button
                            class="px-16 py-6 btn btn-secondary"
                            :disabled="loading"
                            :class="loading ? 'opacity-50 cursor-not-allowed' : ''"
                            @click="storeNewExam"
                        >
                            {{ loading ? `Extracting... (${timeElapsed}s)` : 'Extract Exam Questions' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stored Exams -->
        <div
            class="card-group sm:flex *:not-last:border-e *:not-last:border-base-content/25 max-w-full overflow-x-auto"
        >
            <div v-for="exam in getExams()" :key="exam.title" class="min-w-80 max-w-xs card">
                <div class="card-body">
                    <h2 class="mb-2 h-24 overflow-y-auto text-lg card-title">{{ exam.title }}</h2>
                    <p class="mb-4 h-40 overflow-y-auto text-gray-600 dark:text-gray-400 text-sm">
                        {{ exam.description }}
                    </p>
                    <div class="card-actions">
                        <router-link
                            :to="{ name: exam.marked ? 'marking' : 'questions', params: { title: exam.title } }"
                            class="w-full btn btn-soft"
                            :class="exam.marked ? 'btn-success' : 'btn-info'"
                        >
                            {{ exam.marked ? 'View Results' : 'Continue' }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
