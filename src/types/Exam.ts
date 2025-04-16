import QuestionKind from '@/enums/QuestionKind';

interface Exam extends Markable {
    title: string;
    description: string;
    maxDuration: number; // minutes
    maxMarks: number;
    questions: ExamQuestion[];
    marked: boolean;
    marksAwarded?: number;
    markingComments?: string;
}

interface ExamQuestion extends Markable {
    kind: QuestionKind;
    text: string;
    maxMarks: number;
    answerRows?: number; // for text questions
    options?: string[]; // for multiple choice questions
    answer?: string | string[];
}

interface Markable {
    marksAwarded?: number;
    markingComments?: string;
}

export default Exam;
export { ExamQuestion };
