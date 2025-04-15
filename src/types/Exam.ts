import QuestionKind from '@/enums/QuestionKind';

interface Exam {
    title: string;
    description: string;
    maxDuration: number; // minutes
    maxMarks: number;
    questions: ExamQuestion[];
    marksAwarded?: number;
    markingComments?: string;
}

interface ExamQuestion {
    kind: QuestionKind;
    text: string;
    maxMarks: number;
    answerRows?: number; // for text questions
    options?: string[]; // for multiple choice questions
    answer?: string | string[];
    markingComments?: string;
}

export default Exam;
export { ExamQuestion };
