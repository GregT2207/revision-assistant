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
    <div>
        <h2 v-html="question.text"></h2>
        <p class="mb-2 text-gray-400 text-xs">{{ question.maxMarks }} mark{{ question.maxMarks > 1 ? 's' : '' }}</p>

        <component
            :is="kindsComponents.get(question.kind)"
            v-model="value"
            placeholder="Enter your answer..."
            :rows="question.answerRows"
            :options="question.options"
        />
    </div>
</template>
