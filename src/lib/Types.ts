export interface TQuestion {
    title: string;
    answers: string[];
    correctAnswer: number;
}

export interface TExam {
    title: string;
    questions: TQuestion[];
    code: string;
    descr: string;
    date: string;
    columns: number;
}

export type MapAnswerType = {
    [id: number]: string;
};

export type MapAnswerResultType = {
    [code: string]: string;
};

export interface Options {
    numExams: number;
    numQuestions: number;
    columns: number;
    title: string;
    date: string;
    descr: string;
}
