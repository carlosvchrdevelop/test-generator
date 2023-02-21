<script lang="ts">
    import Page from "./page.svelte";
    import type { TExam, TQuestion } from '../lib/Types';
    import { MapAnswers, suffleAnswers } from '../lib/ExamUtils';
    import ExamHeader from './examHeader.svelte'
    import Question from './question.svelte'
    export let columns: number;
    export let exam: TExam;
    export let registrar: (code: string, answer: string) => void;

    let questions:TQuestion[] = exam.questions.map(v => {
        let curquest: TQuestion = suffleAnswers(v);
        registrar(exam.code, MapAnswers[curquest.correctAnswer]);
        return curquest;
    });
</script>

<main>
    <Page header={exam.code}>
        <ExamHeader title={exam.title} date={exam.date} descr={exam.descr} />
        <div class="container" style="grid-template-columns: repeat({columns},1fr)">
            {#each questions as question, i}
            <Question {question} id={i+1}/>
            {/each}
        </div>
    </Page>

</main>

<style>
    .container {
        display: grid;
    }
</style>