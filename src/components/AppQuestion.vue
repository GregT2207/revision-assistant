<script setup lang="ts">
    import QuestionKind from '@/enums/QuestionKind';
    import { ref } from 'vue';
    import QuestionCheckboxGroup from './QuestionCheckboxGroup.vue';
    import QuestionDropdown from './QuestionDropdown.vue';
    import QuestionRadioGroup from './QuestionRadioGroup.vue';
    import QuestionTextbox from './QuestionTextbox.vue';

    const props = defineProps<{
        questionKind: QuestionKind;
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
    <div><component :is="kindsComponents.get(questionKind)"></component></div>
</template>
