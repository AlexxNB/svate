import {writable} from 'svelte/store';
import {err,indexOrZero} from '@lib/utils'

export function finite(list,initial){
    return createStateMachine(list,initial,true);
}

export function infinite(list,initial){
    return createStateMachine(list,initial,false);
}

function createStateMachine(list,initial,finite){
    if(!Array.isArray(list) || !list.length) throw err('List of states should be a filled array');

    let current;
    let maxstep = list.length-1;
    const getState = num => {
        if(finite && num < 0) num = 0;
        if(finite && num > maxstep) num = maxstep;
        if(!finite && num < 0) num = Math.abs(maxstep+num+1);
        if(!finite) num = num % (maxstep+1);
        return list[current = num];
    }

    const {subscribe,set} = writable( getState(indexOrZero(list,initial)) );
    const first = writable(current===0);
    const last = writable(current===maxstep);

    const setState = num => {
        set(getState(num));
        first.set(current===0)
        last.set(current===maxstep)
    }

    return {
        subscribe,
        next(){setState(current+1)},
        back(){setState(current-1)},
        first(){setState(0)},
        last(){setState(maxstep)},
        index(step){setState(step)},
        set(state){setState(indexOrZero(list,state))},
        get states(){return list},
        get current(){return getState(current)},
        get isFirst(){return first},
        get isLast(){return last},
    }
}