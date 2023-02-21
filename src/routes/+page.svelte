<script lang="ts">
    import { pad } from "../lib/Utils";
    import Exam from "../components/exam.svelte";
    import { getRandomExams, MapAnswers, suffleAnswers } from "../lib/ExamUtils";
    import type { Options, TExam, TQuestion } from "../lib/Types";
    import Results from "../components/results.svelte";
    import OptionsBox from "../components/optionsBox.svelte";

    // Exams
    let exams: TExam[] = [];

    // Resultados
    let results: Map<string, string> = new Map();
        
    const registrar = (code: string, result: string) => {
        if(results.get(code)){
            results.set(code, `${results.get(code)}${result}`)
        }else{
            results.set(code, result);
        }
    }

    const applyChanges = (exam: TExam, code: number): TExam => {
        exam.code = pad(code, 4);
        exam.questions = exam.questions.map(v => {
            return suffleAnswers(v);
        });
        exam.questions.forEach(v => registrar(exam.code, MapAnswers[v.correctAnswer]))
        return exam;
    }

    // Rellena las varibales del examen desde las temporales
    const generar = (opt: Options, questions: TQuestion[]) => {
        results.clear();
        exams = getRandomExams(opt, questions);
        exams = exams;
    }

</script>

<div class="options">
    <OptionsBox fn={generar} />
</div>

{#each exams as exam, i}
    <Exam exam={applyChanges(exam, i)} />
{/each}

<Results {results} />

<style>
    :global(body) {
        margin: 0;
        background: rgb(204,204,204);
    }

    @media print {
        .options {
            display: none;
        }
    }
</style>

