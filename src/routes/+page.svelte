<script lang="ts">
    import { pad } from "../lib/Utils";
    import Exam from "../components/exam.svelte";
    import { getRandomExams, parseCSV } from "../lib/ExamUtils";
    import type { TExam, TQuestion } from "../lib/Types";
    import Page from "../components/page.svelte";

    // Varibales que se rellenan al pulsar botón generar y se usan para generar el examen
    let numExams: number = 0;
    let numQuestions: number = 0;
    let columns: number = 0;
    let title: string = '';
    let date: string = '';
    let descr: string = '';

    // Variables temporales que reciben los valores de los inputs
    let _numQuestions: number = 30;
    let _numExams: number = 25;
    let _columns: number = 2;
    let _title: string = 'Examen';
    let _descr: string = '';
    let today: Date = new Date();
    let _date: string = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;

    // CSV
    let files: any;

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

    const applyCode = (exam: TExam, code: number): TExam => {
        exam.code = pad(code, 4);
        return exam;
    }

    // Formatea los resultados de los exámenes
    const stringify = (results: Map<string, string>): string[] => {
        let r: string[] = [];
        results.forEach((v: string, k: string) => {
            r.push(`${k}: ${v}`);
        });
        
        return r;
    }

    // Rellena las varibales del examen desde las temporales
    const generar = () => {
        columns = _columns;
        numExams = _numExams;
        numQuestions = _numQuestions;
        title = _title;
        date = _date;
        descr = _descr;
        console.log(results);
        results.clear();
        exams = getRandomExams(title, descr, date, numExams, numQuestions, questions);
        exams = exams;
    }

    const print = () => {
       window.print();
    }

    let questions: TQuestion[];

    $: if (files) {
		for (const file of files) {
			const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                let csv: string | undefined = e.target?.result as string;
                questions = parseCSV(csv);
            });
            reader.readAsText(file);
		}
	}

</script>

<div class="form">
    <input bind:files
        accept=".csv"
	    id="dbquestions"
	    type="file" />
    <label>
        Título: 
        <input type="text" bind:value={_title}>
    </label>
    <label>
        Fecha del examen: 
        <input type="text" bind:value={_date}>
    </label>
    <label>
        Enunciado: 
        <textarea bind:value={_descr}></textarea>
    </label>
    <label>
        Número de exámenes a generar: 
        <input type="number" min="1" bind:value={_numExams}>
    </label>
    <label>
        Número de preguntas por examen: 
        <input type="number" min="1" bind:value={_numQuestions}>
    </label>
    <label>
        Número de columnas: 
        <label>
            <input type="radio" name="columns" value={1} bind:group={_columns}> Una
        </label>
        <label>
            <input type="radio" name="columns" value={2} bind:group={_columns}> Dos
        </label>
        <label>
            <input type="radio" name="columns" value={3} bind:group={_columns}> Tres
        </label>
    </label>
    <button on:click={generar}>Generar</button>
    <button on:click={print}>Imprimir</button>
</div>

{#each exams as exam, i}
    <Exam {columns} exam={applyCode(exam, i)} {registrar}/>
{/each}
<Page>
    <h1>Resultados</h1>
    {#each stringify(results) as v}
        <p>{v}</p>
    {/each}
</Page>

<style>
    :global(body) {
        margin: 0;
        background: rgb(204,204,204);
    }

    .form {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        margin-bottom: 3rem;
        background-color: #272727;
        color: white;
    }

    button {
        cursor: pointer;
        background-color: teal;
    }

    @media print {
        .form {
            display: none;
        }
    }
</style>

