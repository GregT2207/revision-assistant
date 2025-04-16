<script setup lang="ts">
    import QuestionDropdown from '@/components/QuestionDropdown.vue';
    import Exam from '@/types/Exam';
    import { ref } from 'vue';

    const examPaper = ref<File | null>(null);

    const setApiKey = (e: Event) => {
        const input = e.target as HTMLInputElement;
        const apiKey = input.value;

        localStorage.setItem('llm_api_key', apiKey);
    };

    const setModel = (model: string) => {
        localStorage.setItem('llm_model', model);
    };

    const extractExamQuestions = async () => {
        let exams: Exam[];
        try {
            exams = JSON.parse(localStorage.getItem('exams') as string) || [];
        } catch (error: unknown) {
            exams = [];
        }

        // exams.push(JSON.parse());

        localStorage.setItem('exams', JSON.stringify(exams));
    };
</script>

<template>
    <div class="mx-auto p-16 container">
        <div class="gap-4 grid grid-cols-2">
            <div class="flex flex-col gap-4">
                <p>OpenAI API Key</p>
                <input
                    type="password"
                    class="bg-gray-700 px-3 py-2 border border-green-500 focus:border-green-500 rounded focus:outline-none w-full text-light-100 placeholder-green-500"
                    placeholder="sk-something"
                    @change="setApiKey"
                />
            </div>

            <div class="flex flex-col gap-4">
                <p>Model</p>
                <QuestionDropdown
                    :model-value="'GPT-4o'"
                    :options="['GPT-4o', 'GPT-4', 'GPT-3.5']"
                    @change="setModel"
                />
            </div>

            <div class="flex flex-col gap-4 col-span-2">
                <p>Exam Paper</p>
                <input
                    type="file"
                    class="bg-gray-700 px-3 py-2 border border-red-500 focus:border-red-500 rounded focus:outline-none w-full text-light-100 placeholder-green-500"
                    accept=".pdf"
                    placeholder="Upload PDF"
                />
            </div>

            <div class="flex flex-col gap-4 col-span-2 mt-8">
                <button
                    class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-light-100 transition duration-200"
                    @click="extractExamQuestions"
                >
                    Extract exam questions
                </button>
            </div>
        </div>
    </div>
</template>
