<script>
    import {flagset} from '@svate';
    const flags = flagset({
        x:0,
        y:1,
        z:0
    });
    const {locked} = flags;
</script>


<div>
    <b>Current state:</b> 
    {#each flags.list as name}
        <div>
            &nbsp;
            <b>{name}:</b><span class:active={$flags[name]}>{$flags[name] ? 'on' : 'off'}</span>
            -
            <button on:click={flags.flag[name].on}>On</button>
            <button on:click={flags.flag[name].off}>Off</button>
            <button on:click={flags.flag[name].toggle}>Toggle</button>
        </div> 
    {/each}
</div>
<div><b>Is locked?:</b> {$locked ? 'yes' : 'no'}</div>
<p>
    <button on:click={flags.on}>All On</button>
    <button on:click={flags.off}>All Off</button>
    <button on:click={flags.toggle}>All Toggle</button>
    &nbsp;
    <button on:click={flags.lock}>Lock</button>
    <button on:click={flags.unlock}>Unlock</button>
</p>