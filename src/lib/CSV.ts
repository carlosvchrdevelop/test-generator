import fs from 'fs';
import readline from 'readline';
import type { TQuestion } from './Types';

async function readCSV(
    path: string,
    separator: string = ';'
): Promise<TQuestion[]> {
    let questions: TQuestion[] = [];

    const fileStream = fs.createReadStream(path);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        let values = line.split(separator)?.filter((v, _) => {
            return v && v.length > 0;
        });
        if (values && values.length > 2) {
            questions.push({
                title: values[0],
                correctAnswer: 0,
                answers: values.slice(1, values.length),
            });
        }
    }

    return questions;
}

export default readCSV;
