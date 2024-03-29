# svate

Set of state machines for Svelte applications based on internal Svelte's store.

## Content

Set includes four types of state machines:

* `machine` - simple state machine
* `endlessMachine` - same as `machine` but can move through list's edges
* `flag` - simple flag
* `flagset` - set of flags

## State machines

You can use one of `machine` or `endlessMachine`, which are very similar. They allows to choose state from the list of ones. Only the difference is that `machine` doesn't allow to move through edges of the list. For example, calling `myMachine.next()` when current state is last in list will do nothing. But in case of `endlessMachine` state will change to the one from start of the list.

```html
<script>
    import {machine} from 'svate';
    const pages = machine(['One','Two','Three']);
    const {isLast} = pages;
</script>

This is page {$pages}.

{#if $isLast}It is last page!{/if}

<button on:click={pages.back}>Previous</button>
<button on:click={pages.next}>Next</button>

```
### machine initializing

`machine(list,[initial]) | endlessMachine(list,[initial])` – parameter `list` is an array of states. Each element may be any type. The `initial` is a value from the list which will be used as initial state, default is first element of the list.

### machine API

* `subscribe()` – Svelte store subscription function. Returns current state in its callback.
* `next()` – switch to the next state
* `back()` – switch to the previous state
* `first()` – switch to the first state
* `last()` – switch to the last state
* `set(state)` – switch to the state with name `state`
* `index(num)` – switch to the state with index `num`. Index starts from 0.
* `states` – array of the states, same as initial one.
* `current` – returns current state.
* `isFirst` – returns Svelte's store which will give `true` when state will be first in the list or `false` in other cases.
* `isLast` – returns Svelte's store which will give `true` when state will be last in the list or `false` in other cases.

## Flag

Simple Svelte store which has a state `true` or `false`;

```html
<script>
    const myflag = flag(0);
</script>

Flag is {$myflag ? 'on' : 'off'}!

<button on:click={myflag.on}>On</button>
<button on:click={myflag.off}>Off</button>
<button on:click={myflag.toggle}>Toggle</button>
```
### flag initializing

`flag(initial)` – parameter `initial` is set default state for the flag.

### flag API

* `subscribe()` – Svelte store subscription function. Returns current flag's state in its callback.
* `on()` – set state to `true` value.
* `off()` – set state to `false` value.
* `toggle()` – toggle state value from `false` to `true` or vise versa.
* `set(state)` – set state to the provided `state` value.
* `lock()` – lock the flag. Any method will not be able to change the flag's state.
* `unlock()` – unlock a locked flag.
* `state` – returns current state of the flag.
* `locked` – returns Svelte's store which will give `true` when flag is locked or `false` in other case.

## Flagset

Set of flags in one Svelte's store.

```html
<script>
    const myflags = flagset({
        x: 0,
        y: 1,
        z: false
    })
</script>

Flag X is {$myflags.x ? 'on' : 'off'}
Flag Y is {$myflags.y ? 'on' : 'off'}
Flag Z is {$myflags.z ? 'on' : 'off'}

<button on:click={myflags.x.on}>On flag X</button>
<button on:click={myflags.z.off}>Off flag Z</button>
<button on:click={myflags.$.toggle}>Toggle all flags</button>
```

### flagset initializing

`flagset(initial)` – parameter `initial` is an object with names and initial states.

### flagset API

* `subscribe()` – Svelte store subscription function. Returns current state of all flags in its callback.
* `[name]` – methods to manipulate with flag `name`:
    - `on()` – set state of the flag to `true` value.
    - `off()` – set state of the flag to `false` value.
    - `toggle()` – toggle state value from `false` to `true` or vise versa.
    - `set(state)` – set state to the provided `state` value.
    - `state` – returns current state of the flag.
* `set`|`$` – methods to use with whole flagset:
    - `on()` – set state of all flags to `true` value.
    - `off()` – set state of all flags to `false` value.
    - `toggle()` – toggle state of all flags.
    - `reset()` – set initial state for each flag.
    - `set(state)` – set state of all flags to the provided `state` value.
    - `lock()` – lock the flagset. Any method will not be able to change the any flag in the set.
    - `unlock()` – unlock a locked flagset.
    - `locked` – returns Svelte's store which will give `true` when flagset is locked or `false` in other case.
    - `list` – returns array of flag's names.