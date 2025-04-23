<script setup lang="ts">
    import AppDropdown from '@/components/AppDropdown.vue';
    import examExtractor from '@/services/ExamExtractor';
    import Exam from '@/types/Exam';
    import { base64EncodeFile } from '@/utils/file-utils';
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
    <div class="space-y-16 mx-auto p-16 container">
        <div class="gap-4 grid grid-cols-2">
            <div class="flex flex-col gap-2">
                <p>OpenAI API Key</p>
                <input v-model="apiKey" type="password" class="input" placeholder="sk-something" aria-label="input" />
            </div>

            <div class="flex flex-col gap-2">
                <p>Model</p>
                <AppDropdown v-model="model" :options="['gpt-4o', 'gpt-4o-mini', 'o1']">
                    <small>
                        <a href="https://platform.openai.com/docs/models" target="_blank" class="underline"
                            >Read more about OpenAI models here</a
                        >
                    </small>
                </AppDropdown>
            </div>

            <div class="flex flex-col gap-2 col-span-2">
                <p>Exam Paper</p>
                <input
                    type="file"
                    class="input"
                    accept=".pdf"
                    @change="(e: Event) => (uploadedExam = (e.target as HTMLInputElement).files?.[0] || null)"
                    aria-label="file-input"
                />
            </div>

            <div class="flex flex-col gap-4 col-span-2 mt-4">
                <button
                    class="btn btn-soft btn-secondary"
                    :class="loading ? 'opacity-50 cursor-not-allowed' : ''"
                    :disabled="loading"
                    @click="storeNewExam"
                >
                    {{ loading ? `Extracting exam questions... (${timeElapsed}s elapsed)` : 'Extract exam questions' }}
                </button>
            </div>
        </div>

        <div
            class="card-group sm:flex *:not-last:border-e *:not-last:border-base-content/25 sm:max-w-full max-w-sm sm:max-h-128 overflow-x-auto"
        >
            <div v-for="exam in getExams()" :key="exam.title" class="min-w-80 max-w-100 card">
                <div class="card-body">
                    <h2 class="mb-2 h-32 overflow-y-auto card-title">{{ exam.title }}</h2>
                    <p class="mb-4 h-64 overflow-y-auto">{{ exam.description }}</p>

                    <div class="card-actions">
                        <router-link
                            :to="{ name: exam.marked ? 'marking' : 'questions', params: { title: exam.title } }"
                            class="w-full btn btn-soft"
                            :class="{
                                'btn-success': exam.marked,
                                'btn-info': !exam.marked,
                            }"
                        >
                            {{ exam.marked ? 'View results' : 'Continue' }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
