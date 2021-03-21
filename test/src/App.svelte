<script>
    import Machine from './Machine.svelte';
    import EndlessMachine from './EndlessMachine.svelte';
    import Flag from './Flag.svelte';
    import Flagset from './Flagset.svelte';
</script>

<h1>1. Machine</h1>

<Machine/>

<hr/>

<h1>2. Endless machine</h1>

<EndlessMachine/>

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