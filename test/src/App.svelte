<script>
    import Finite from './Finite.svelte';
    import Infinite from './Infinite.svelte';
    import Flag from './Flag.svelte';
    import Flagset from './Flagset.svelte';
</script>

<h1>1. Finite machine</h1>

<Finite/>

<hr/>

<h1>2. Infinite machine</h1>

<Infinite/>

<hr/>

<h1>3. Single flag</h1>

<Flag/>

<hr/>

<h1>4. Flags set</h1>

<Flagset/>

<style>
    :global(body){
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 16px;
    }

    :global(.active){
        color:brown;
        text-decoration: underline;
    }
</style>