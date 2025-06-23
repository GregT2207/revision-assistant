<script setup lang="ts">
    import QuestionKind from '@/enums/QuestionKind';
    import { ExamQuestion } from '@/types/Exam';
    import { shallowRef } from 'vue';
    import AppCheckboxGroup from './AppCheckboxGroup.vue';
    import AppDropdown from './AppDropdown.vue';
    import AppRadioGroup from './AppRadioGroup.vue';
    import AppTextbox from './AppTextbox.vue';

    const props = defineProps<{
        question: ExamQuestion;
    }>();

    const value = defineModel<string | string[]>();

    const kindsComponents = shallowRef(
        new Map<QuestionKind, unknown>([
            [QuestionKind.Text, AppTextbox],
            [QuestionKind.Checkbox, AppCheckboxGroup],
            [QuestionKind.Radio, AppRadioGroup],
            [QuestionKind.Dropdown, AppDropdown],
        ]),
    );
</script>

<template>
    <div class="mb-6">
        <h2 class="mb-1 font-medium text-lg" v-html="question.text" />

        <p class="mb-3 text-gray-500 dark:text-gray-400 text-sm">
            {{ question.maxMarks }} mark{{ question.maxMarks > 1 ? 's' : '' }}
        </p>

        <component
            :is="kindsComponents.get(question.kind)"
            v-model="value"
            :placeholder="question.kind === QuestionKind.Text ? 'Enter your answer...' : undefined"
            :rows="question.answerRows"
            :options="question.options"
        />
    </div>
</template>
