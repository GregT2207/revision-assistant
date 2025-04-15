import Exam from '@/types/Exam';
import llmService, { LlmServiceClass } from './LlmService';

class ExamExtractor {
    private llmService: LlmServiceClass;

    constructor() {
        this.llmService = llmService;
    }

    async extractExamQuestions(): Promise<Exam | null> {
        return null;
    }
}
