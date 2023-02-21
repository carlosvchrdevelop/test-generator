<script lang="ts">
    import Page from "./page.svelte";
    import type { TExam } from '../lib/Types';
    import ExamHeader from './examHeader.svelte'
    import Question from './question.svelte'
    export let exam: TExam;
</script>

<main>
    <Page header={exam.code}>
        <ExamHeader title={exam.title} date={exam.date} descr={exam.descr} />
        <div class="container" style="grid-template-columns: repeat({exam.columns},1fr)">
            {#each exam.questions as question, i}
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