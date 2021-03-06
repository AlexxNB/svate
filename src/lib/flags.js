import {writable} from 'svelte/store';
import { err } from './utils';

export function flag(initial){
    let state = !!initial;
    let lock = false;

    const {subscribe,set} = writable(state);
    const locked = writable(lock);

    return {
        subscribe,
        on(){!lock && set(state=true)},
        off(){!lock && set(state=false)},
        toggle(){!lock && set(state=!state)},
        set(value){!lock && set(state=!!value)},
        lock(){locked.set(lock=true)},
        unlock(){locked.set(lock=false)},
        get state(){return state},
        get locked(){return locked}
    }
}

const PRESERVED = ['subscribe','set','$'];
export function flagset(initial){
    if(!typeof initial == 'object') throw err('flagset function must get object with names and states');

    const list = Object.keys(initial);

    const initial_state = list.reduce((o,name)=>(o[name] = !!initial[name],o),{});
    const copyInitial = ()=>Object.assign({},initial_state)
    let state = copyInitial();

    let lock = false;

    const stateStore = writable(state);
    const locked = writable(lock);

    const setState = ()=>stateStore.set(state);

    const set = {
        on(){!lock && setState(list.forEach(name => state[name]=true))},
        off(){!lock && setState(list.forEach(name => state[name]=false))},
        toggle(){!lock && setState(list.forEach(name => state[name]=!state[name]))},
        reset(){!lock && setState(state = copyInitial())},
        set(value){!lock && setState(list.forEach(name => state[name]=!!value))},
        lock(){locked.set(lock=true)},
        unlock(){locked.set(lock=false)},
        get locked(){return locked},
        get list(){return list},
    }

    const flags = {
        subscribe: stateStore.subscribe,
        set:set,
        $:set,
    }

    list.forEach( name =>{
        if(PRESERVED.includes[name]) throw err(`flag name can't be ${name}, please rename it`);
        flags[name]={
            on(){!lock && setState(state[name]=true)},
            off(){!lock && setState(state[name]=false)},
            toggle(){!lock && setState(state[name]=!state[name])},
            set(value){!lock && setState(state[name]=!!value)},
            get state(){return state[name]}
        }
    });

    return flags;
}