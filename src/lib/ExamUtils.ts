import type { MapAnswerType, Options, TExam, TQuestion } from './Types';

export const parseCSV = (csv: string, separator: string = ';'): TQuestion[] => {
    let strquest: string[] = csv.split('\n');
    let questions: TQuestion[] = [];
    for (let q of strquest) {
        let values = q.split(separator).filter((v) => {
            return v && v.length > 0 && v !== '\n' && v !== '\r';
        });
        if (values && values.length > 1) {
            questions.push({
                title: values[0],
                correctAnswer: 0,
                answers: values.slice(1, values.length),
            });
        }
    }
    return questions;
};

export const getRandomExams = (
    opt: Options,
    questions: TQuestion[]
): TExam[] => {
    let exams: TExam[] = [];
    for (let i = 0; i < opt.numExams; i++) {
        let quest: TQuestion[] = getQuestions(questions, opt.numQuestions);

        if (quest && quest.length > 0) {
            exams.push({
                title: opt.title,
                descr: opt.descr,
                columns: opt.columns,
                code: '',
                date: opt.date,
                questions: quest,
            });
        }
    }
    return exams;
};

const getQuestions = (questions: TQuestion[], nquest: number): TQuestion[] => {
    return suffleQuestions(questions)?.slice(
        0,
        Math.min(nquest, questions.length)
    );
};

const suffleQuestions = (
    ql: TQuestion[],
    nsuffles: number = ql?.length * 2
): TQuestion[] => {
    for (let i = 0; i < nsuffles; i++) {
        let n1: number = getRandInt(ql?.length);
        let n2: number = getRandInt(ql?.length);
        let aux: TQuestion = ql[n1];
        ql[n1] = ql[n2];
        ql[n2] = aux;
    }
    return ql;
};

export const suffleAnswers = (
    q: TQuestion,
    nsuffles: number = 10
): TQuestion => {
    if (q && q.answers && q.answers.length > 1) {
        for (let i = 0; i < nsuffles; i++) {
            let n1: number = getRandInt(q.answers.length);
            let n2: number = getRandInt(q.answers.length);

            let aux: string = q.answers[n1];
            q.answers[n1] = q.answers[n2];
            q.answers[n2] = aux;
            if (q.correctAnswer == n1) {
                q.correctAnswer = n2;
            } else if (q.correctAnswer == n2) {
                q.correctAnswer = n1;
            }
        }
    }
    return q;
};

const getRandInt = (nValues: number): number =>
    Math.round(Math.random() * (nValues - 1) || 0);

export const MapAnswers: MapAnswerType = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
};
