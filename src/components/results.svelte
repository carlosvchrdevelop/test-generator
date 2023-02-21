<script lang="ts">
    import Page from "../components/page.svelte";
    export let results: Map<string,string>;

    // Formatea los resultados de los exámenes
    const stringify = (results: Map<string, string>): string[] => {
        let r: string[] = [];
        results.forEach((v: string, k: string) => {
            r.push(`${k}: ${v}`);
            console.log(`${k}: ${v}`);
        });
        return r;
    }
</script>

<Page>
    <h1>Resultados</h1>
    {#each stringify(results) as v}
        <p>{v}</p>
    {/each}
</Page>

<style>
    
</style>