import QuestionKind from '@/enums/QuestionKind';

interface Exam extends Markable {
    fileName: string;
    title: string;
    description: string;
    maxDuration: number; // minutes
    questions: ExamQuestion[];
    marked: boolean;
    marksAwarded?: number;
    markingComments?: string;
}

interface ExamQuestion extends Markable {
    kind: QuestionKind;
    text: string;
    answerRows?: number; // for text questions
    options?: string[]; // for multiple choice questions
    answer?: string | string[];
    correctAnswer?: string | string[];
}

interface Markable {
    maxMarks: number;
    marksAwarded?: number;
    markingComments?: string;
}

export default Exam;
export { ExamQuestion, Markable };
