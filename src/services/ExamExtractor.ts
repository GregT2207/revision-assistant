import extractExamDataPrompt from '@/prompts/extract-exam-data/prompt.json';
import responseSchema from '@/prompts/extract-exam-data/response-schema.json';
import Exam from '@/types/Exam';
import llmService from './LlmService';

class ExamExtractor {
    async extractExamQuestions(file: File): Promise<Exam | null> {
        if (!extractExamDataPrompt || !extractExamDataPrompt.data) {
            console.error('Prompt for extracting exam data is not available.');
            return null;
        }

        if (!responseSchema || !responseSchema) {
            console.error('Response schema for extracting exam data is not available.');
            return null;
        }

        const llmResponse = await llmService.sendUserMessage(extractExamDataPrompt.data, responseSchema, file);
        let exam: Exam;
        try {
            exam = JSON.parse(llmResponse);
        } catch (error) {
            console.error('Error parsing LLM response:', error, llmResponse);
            return null;
        }

        return exam;
    }
}

type ExamExtractorClass = InstanceType<typeof ExamExtractor>;

export default new ExamExtractor();
export { ExamExtractorClass };
