<script lang="ts">
    import type { TQuestion } from "$lib/Types";
    export let question: TQuestion;
    export let id: number;
</script>

<main>
    <p>{id}. {question.title}</p>
    <ol type="A">
        {#each question.answers as ans}
            <li>{ans}</li>
            {/each}
    </ol>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
    }

    p, li {
        font-size: 11pt;
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }

    p {
        line-height: 120%;
    }

    ol {
        margin: 0 0 11pt 0;
    }

    li {
        margin: 4pt 0;
    }

</style>