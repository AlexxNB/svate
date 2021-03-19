<script>
    import {flag} from '@svate';
    const togler = flag(0);
    const {locked} = togler;
</script>


<div><b>Current state:</b> <span class:active={$togler}>{$togler ? 'on' : 'off'}</span></div>
<div><b>Is locked?:</b> {$locked ? 'yes' : 'no'}</div>
<p>
    <button on:click={togler.on}>On</button>
    <button on:click={togler.off}>Off</button>
    <button on:click={togler.toggle}>Toggle</button>
    &nbsp;
    <button on:click={()=>togler.set(1)}>Set On</button>
    <button on:click={()=>togler.set(false)}>Set Off</button>
    &nbsp;
    <button on:click={togler.lock}>Lock</button>
    <button on:click={togler.unlock}>Unlock</button>
</p>