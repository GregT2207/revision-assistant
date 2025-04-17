<script setup lang="ts">
    import QuestionKind from '@/enums/QuestionKind';
    import { ExamQuestion } from '@/types/Exam';
    import { shallowRef } from 'vue';
    import QuestionCheckboxGroup from './QuestionCheckboxGroup.vue';
    import QuestionDropdown from './QuestionDropdown.vue';
    import QuestionRadioGroup from './QuestionRadioGroup.vue';
    import QuestionTextbox from './QuestionTextbox.vue';

    const props = defineProps<{
        question: ExamQuestion;
    }>();

    const value = defineModel<string | string[]>();

    const kindsComponents = shallowRef(
        new Map<QuestionKind, unknown>([
            [QuestionKind.Text, QuestionTextbox],
            [QuestionKind.Checkbox, QuestionCheckboxGroup],
            [QuestionKind.Radio, QuestionRadioGroup],
            [QuestionKind.Dropdown, QuestionDropdown],
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
