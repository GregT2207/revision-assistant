import markExamPrompt from '@/prompts/mark-exam-answers/prompt.json';
import responseSchema from '@/prompts/mark-exam-answers/response-schema.json';
import Exam from '@/types/Exam';
import _ from 'lodash';
import llmService from './LlmService';

class ExamMarker {
    async markExamAnswers(exam: Exam, file?: File | null, guidelines?: string): Promise<Exam | null> {
        if (!file && !guidelines) {
            console.error('File or guidelines must be provided to mark answers.');
            return null;
        }

        if (!markExamPrompt || !markExamPrompt.basePrompt) {
            console.error('Prompt for marking exam answers is not available.');
            return null;
        }

        if (!responseSchema || !responseSchema) {
            console.error('Response schema for marking exam answers is not available.');
            return null;
        }

        let fullPrompt = '';
        if (file) {
            fullPrompt += `\n${markExamPrompt.filePrompt}`;
        }
        fullPrompt += `\n${markExamPrompt.basePrompt}`;
        if (guidelines) {
            fullPrompt += `\n${markExamPrompt.guidelinesPrompt.replaceAll('{{ guidelines }}', guidelines)}`;
        }
        fullPrompt += `\n\n${JSON.stringify(exam)}`;

        const llmResponse = await llmService.sendUserMessage(fullPrompt, responseSchema, file);
        let markedExam: Exam;
        try {
            markedExam = JSON.parse(llmResponse);

            _.merge(exam, markedExam);
            exam.marked = true;
        } catch (error) {
            console.error('Error parsing LLM response:', error, llmResponse);
            return null;
        }

        return exam;
    }
}

type ExamMarkerClass = InstanceType<typeof ExamMarker>;

export default new ExamMarker();
export { ExamMarkerClass };
