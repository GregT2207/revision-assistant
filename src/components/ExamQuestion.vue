<script setup lang="ts">
import QuestionKind from '@/enums/QuestionKind'
import { ExamQuestion } from '@/types/Exam'
import { shallowRef } from 'vue'

// Component imports
import AppCheckboxGroup from './AppCheckboxGroup.vue'
import AppDropdown from './AppDropdown.vue'
import AppRadioGroup from './AppRadioGroup.vue'
import AppTextbox from './AppTextbox.vue'

// Props
const props = defineProps<{
  question: ExamQuestion
}>()

// Two-way binding for user response
const value = defineModel<string | string[]>()

// Dynamic component map
const kindsComponents = shallowRef(
  new Map<QuestionKind, unknown>([
    [QuestionKind.Text, AppTextbox],
    [QuestionKind.Checkbox, AppCheckboxGroup],
    [QuestionKind.Radio, AppRadioGroup],
    [QuestionKind.Dropdown, AppDropdown],
  ])
)
</script>

<template>
  <div class="mb-6">
    <!-- Question text -->
    <h2 class="text-lg font-medium mb-1" v-html="question.text" />

    <!-- Marks info -->
    <p class="mb-3 text-sm text-gray-500 dark:text-gray-400">
      {{ question.maxMarks }} mark{{ question.maxMarks > 1 ? 's' : '' }}
    </p>

    <!-- Dynamic answer input -->
    <component
      :is="kindsComponents.get(question.kind)"
      v-model="value"
      :placeholder="question.kind === QuestionKind.Text ? 'Enter your answer...' : undefined"
      :rows="question.answerRows"
      :options="question.options"
    />
  </div>
</template>
