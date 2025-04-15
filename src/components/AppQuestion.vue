<script setup lang="ts">
    import QuestionKind from '@/enums/QuestionKind';
    import { ref } from 'vue';

    const props = defineProps<{
        questionKind: QuestionKind;
    }>();

    const kindsComponents = ref(
        new Map<QuestionKind, string>([
            [QuestionKind.Text, 'QuestionTextbox'],
            [QuestionKind.Checkbox, 'QuestionCheckboxGroup'],
            [QuestionKind.Radio, 'QuestionRadioGroup'],
        ]),
    );
</script>

<template>
    <div><component :is="kindsComponents.get(questionKind)"></component></div>
</template>
