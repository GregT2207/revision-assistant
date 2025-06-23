<script setup lang="ts">
    import AppDropdown from '@/components/AppDropdown.vue';
    import examExtractor from '@/services/ExamExtractor';
    import Exam from '@/types/Exam';
    import { base64EncodeFile } from '@/utils/file-utils';
    import { onMounted, ref, watchEffect } from 'vue';
    import { useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';

    const router = useRouter();
    const apiKey = ref('');
    const model = ref('gpt-4o');
    const uploadedExam = ref<File | null>(null);
    const loading = ref(false);
    const timeElapsed = ref(0);

    onMounted(() => {
        apiKey.value = localStorage.getItem('llm_api_key') || '';
        model.value = localStorage.getItem('llm_model') || 'gpt-4o';
    });

    watchEffect(() => localStorage.setItem('llm_api_key', apiKey.value));
    watchEffect(() => localStorage.setItem('llm_model', model.value));

    const getExams = (): Exam[] => {
        try {
            return JSON.parse(localStorage.getItem('exams') || '[]');
        } catch {
            return [];
        }
    };

    const storeNewExam = async () => {
        if (!uploadedExam.value) {
            console.error('No exam uploaded');
            return;
        }

        loading.value = true;
        timeElapsed.value = 0;
        const interval = setInterval(() => (timeElapsed.value += 1), 1000);

        try {
            const encodedFile = await base64EncodeFile(uploadedExam.value);
            localStorage.setItem(uploadedExam.value.name, encodedFile);

            const newExam = await examExtractor.extractExamQuestions(uploadedExam.value.name);
            if (!newExam) throw new Error('Extraction failed');

            const exams = getExams();
            exams.push(newExam);
            localStorage.setItem('exams', JSON.stringify(exams));

            router.push({ name: 'questions', params: { title: newExam.title } });
        } catch (err) {
            console.error('Failed to store exam:', err);
        } finally {
            loading.value = false;
            clearInterval(interval);
        }
    };
</script>

<template>
    <div class="space-y-16 mx-auto p-4 sm:px-8 sm:py-16 container max-w-7xl">
        <div class="card">
            <div class="card-body">
                <!-- Input Form -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="flex flex-col gap-2">
                        <label class="font-medium" for="api-key">Enter Your OpenAI API Key</label>
                        <input
                            id="api-key"
                            v-model="apiKey"
                            type="password"
                            class="input w-full px-4 py-5 border border-gray-300 rounded-md shadow-sm bg-base-100 text-base-content placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                            class="flex flex-col items-center justify-center gap-3 px-3 sm:px-6 py-5 sm:py-10 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-base-100 text-center hover:bg-base-200 transition"
                        >
                            <!-- File Icon -->
                            <Icon icon="mdi:file-pdf-box" class="w-20 h-20 text-red-500" />

                            <!-- Drag & Drop Text -->
                            <p class="text-lg font-semibold">Drag and drop a file here</p>
                            <p class="text-md text-gray-500 dark:text-gray-400">PDF only, max 10MB</p>

                            <!-- Button -->
                            <div class="mt-2">
                                <span class="btn btn-lg px-8 sm:px-16 py-4 sm:py-8 btn-soft btn-primary"
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

                    <div class="sm:col-span-2 flex justify-center">
                        <button
                            class="btn btn-secondary px-16 py-6"
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
                    <h2 class="card-title text-lg h-24 overflow-y-auto mb-2">{{ exam.title }}</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 h-40 overflow-y-auto mb-4">
                        {{ exam.description }}
                    </p>
                    <div class="card-actions">
                        <router-link
                            :to="{ name: exam.marked ? 'marking' : 'questions', params: { title: exam.title } }"
                            class="btn btn-soft w-full"
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
