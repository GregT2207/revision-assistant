<script setup lang="ts">
    import QuestionKind from '@/enums/QuestionKind';
    import { ExamQuestion } from '@/types/Exam';
    import { ref } from 'vue';
    import QuestionCheckboxGroup from './QuestionCheckboxGroup.vue';
    import QuestionDropdown from './QuestionDropdown.vue';
    import QuestionRadioGroup from './QuestionRadioGroup.vue';
    import QuestionTextbox from './QuestionTextbox.vue';

    const props = defineProps<{
        question: ExamQuestion;
    }>();

    const kindsComponents = ref(
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
        <h2 class="pb-2">{{ question.text }}</h2>
        <component :is="kindsComponents.get(question.kind)" :options="question.options" />
    </div>
</template>
