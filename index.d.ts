interface BoolStore{
    subscribe(handler: (state: bool) => void)
}

interface StateMachine {
    /** Svelte store subscription function. Returns current state in its callback. */
    subscribe(handler: (state: any) => void)
    /** Switch to the next state */
    next(): void
    /** Switch to the previous state */
    back(): void
    /** Switch to the first state */
    first(): void
    /** Switch to the last state */
    last(): void
    /** Switch to the state with specified value */
    set(value:any): void
    /** Switch to the state by specified index, which starts from 0. */
    index(index:number): void
    /** Array of the states */
    states: any[]
    /** Current state */
    current: any
    /** Svelte's store which will give `true` when state will be first in the list or `false` in other cases. */
    isFirst: BoolStore
    /** Svelte's store which will give `true` when state will be last in the list or `false` in other cases. */
    isLast: BoolStore
}

interface Flag {
    /** Svelte store subscription function. Returns current flag's state in its callback. */
    subscribe(handler: (state: boolean) => void)
    /** Set state to `true` value */
    on(): void
    /** Set state to `false` value */
    off(): void
    /** Toggle state value from `false` to `true` or vise versa */
    toggle(): void
    /** Set state to the provided `state` value */
    set(value:boolean): void
    /** Lock the flag. Any method will not be able to change the flag's state. */
    lock(): void
    /** Unlock a locked flag */
    unlock(): void
    /** Current state of the flag */
    state: boolean
    /** Svelte's store which will give `true` when flag is locked or `false` in other case */
    locked: BoolStore
}

interface FlagsetFlag {
    /** Set state to `true` value */
    on(): void
    /** Set state to `false` value */
    off(): void
    /** Toggle state value from `false` to `true` or vise versa */
    toggle(): void
    /** Set state to the provided `state` value */
    set(value:boolean): void
    /** Current state of the flag */
    state: boolean
}

interface Flagset {
    /** Svelte store subscription function. Returns current state of all flags in its callback. */
    subscribe(handler: (state: boolean) => void)
    /** Methods to manipulate flag */
    flag: Record<string, FlagsetFlag>
    /** Set state of all flags to `true` value */
    on():void
    /** Set state of all flags to `false` value */
    off():void
    /** Toggle state of all flags */
    toggle():void
    /** Revert to initial state for each flag */
    reset():void
    /** Set state of all flags to the provided `state` value */
    set(value:boolean):void
    /** Lock the flagset. Any method will not be able to change the any flag in the set. */
    lock():void
    /** Unlock a locked flagset */
    unlock():void
    /** Svelte's store which will give `true` when flagset is locked or `false` in other case */
    locked: BoolStore
    /** Array of flag's names */
    list:string[]
}

/** Create finite state machine */
export function machine(states:any[]): StateMachine
/** Create infinite state machine */
export function endlessMachine(states:any[]): StateMachine
/** Create simple flag */
export function flag(initial:boolean): Flag
/** Create set of flags */
export function flagset(initial:Record<string, boolean>): Flagset