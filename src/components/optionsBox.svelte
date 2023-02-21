<script lang="ts">
    import { parseCSV } from "$lib/ExamUtils";
    import type { Options, TQuestion } from "$lib/Types";

    export let fn: (opt: Options, questions: TQuestion[])=>void;

    const generar = () => {
        let opt: Options = {
            numExams: _numExams,
            numQuestions: _numQuestions,
            columns: _columns,
            title: _title,
            date: _date,
            descr: _descr,
        };
        fn(opt, questions);
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

    // CSV
    let files: any;

    // Variables temporales que reciben los valores de los inputs
    let _numQuestions: number = 30;
    let _numExams: number = 25;
    let _columns: number = 2;
    let _title: string = 'Examen';
    let _descr: string = '';
    let today: Date = new Date();
    let _date: string = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
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

<style>
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
</style>