<script>
    import {finite} from '@svate';
    const steps = finite([
        'One',
        'Two',
        'Three',
        'Four',
        'Five'
    ]);

    const {isLast,isFirst} = steps;
</script>

<div>
    <b>States:</b> 
    {#each steps.states as state}
        <span class:active={state==$steps}>{state}</span>&nbsp;
    {/each}
</div>
<div><b>Current state:</b> {$steps}</div>
<div><b>Is first?:</b> {$isFirst ? 'yes' : 'no'}</div>
<div><b>Is last?:</b> {$isLast ? 'yes' : 'no'}</div>
<p>
    <button on:click={steps.first}>First</button>
    <button on:click={steps.back}>&lt; Back</button>
    <button on:click={steps.next}>Next &gt;</button>
    <button on:click={steps.last}>Last</button>
    &nbsp;
    <button on:click={()=>steps.set('Three')}>Set Three</button>
    <button on:click={()=>steps.index(3)}>Set index 3</button>
</p>