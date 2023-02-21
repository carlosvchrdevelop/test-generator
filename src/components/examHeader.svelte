<script lang="ts">
    export let title: string;
    export let date: string;
    export let descr: string;
    let lines: string[] = descr.split('\n');
</script>

<main>
    <h1>{title}</h1>
    <div class="second-row">
        <h2>Nombre: </h2>
        <h2>Fecha: {date}</h2>
    </div>
    {#each lines as line}
    <p>{line}</p>
    {/each}
</main>

<style>
    h1 {
        text-align: center;
        font-size: 14pt;
    }

    h2 {
        font-size: 12pt;
    }

    .second-row {
        display: flex;
        margin: 0.3cm;
        justify-content: space-between;
        align-items: center;
    }

    p{
        line-height: 150%;
        margin: 0 0.3cm 0.3cm 0.3cm;
    }

    main {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 11pt;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 150%;
        outline: 1px solid black;
        outline-offset: -1px;
        margin-bottom: 1cm;
    }

    @media print {
        main { page-break-before: always; }
    }
</style>