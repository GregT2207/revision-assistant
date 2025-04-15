<script setup lang="ts">
    import AppQuestion from './components/AppQuestion.vue';
    import QuestionKind from './enums/QuestionKind';
</script>

<template>
    <div id="app">
        <div class="space-y-8 mx-auto p-4 container">
            <AppQuestion :question-kind="QuestionKind.Dropdown" />
        </div>
    </div>
</template>
