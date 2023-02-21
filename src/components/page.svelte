<script lang="ts">
    export let landscape: boolean = false;
    export let header: string = "";

    let w: string = landscape ? "29.7cm":"21cm"
    let h: string = landscape ? "21cm":"29.7cm"

</script>

<main style="--w:{w}; --h:{h};">
    <p class="header">{header}</p>
    <div class="content">
        <slot></slot>
    </div>
</main>

<style>
    main {
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        margin-bottom: 0.5cm;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
        width: var(--w);
        height: var(--h);
    }

    .content {
        width: calc(100% - 6cm);
        height: calc(100% - 5cm);
        overflow: hidden;

    }

    .header {
        position: absolute;
        transform: translateY(calc(var(--h) * -0.5 + 7pt + 1cm));
        font-size: 14pt;
        font-family: Arial, Helvetica, sans-serif;
    }

    @media print {
        main {
            margin: 0;
            box-shadow: none;
        }
    }
</style>