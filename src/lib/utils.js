export function err(str){
    return new Error('[Svate]',str);
}

export function indexOrZero(array,value){
    return (array.indexOf(value) < 0) ? 0 : array.indexOf(value)
}