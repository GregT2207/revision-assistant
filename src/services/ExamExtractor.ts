import extractExamDataPrompt from '@/prompts/extract-exam-data.txt';
import Exam from '@/types/Exam';
import llmService from './LlmService';

class ExamExtractor {
    async extractExamQuestions(): Promise<Exam | null> {
        if (!extractExamDataPrompt) {
            console.error('Prompt for extracting exam data is not available.');
            return null;
        }

        const llmResponse: unknown = llmService.sendUserMessage(extractExamDataPrompt);
        let exam: Exam;
        try {
            exam = JSON.parse(llmResponse as string);
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
